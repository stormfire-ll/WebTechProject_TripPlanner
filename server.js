const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const axios = require('axios')
const session = require('express-session');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const FileStore = require('session-file-store')(session);
//const currencyModel = require("./public/javascript/currency-list.js");
//const bodyParser = require("body-parser");


// Serve static views from the "public" directory
app.use(express.static(path.join(__dirname, '/public')));

//Login Session
app.use(cookieParser('some key'));

app.use(
    session({
       secret: 'some key',
       resave: false,
       saveUninitialized: false,
       store: new FileStore({
           path: './public/data/',
           encrypt: true,
        }),
    })
);
app.set('views', path.join(__dirname, '/public/views' ));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

//? Path correct
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Other routes and middleware

//Mainpage
app.get("/", (req, res) => {
    res.render('index');
});

app.get("/dashboard", isAuth, (req, res) => {
   res.render('dashboard');
})
//test
app.get("/dashboard", (req, res) => {
    res.render('dashboard');
 })

//Login
app.get("/login", (req, res) => {
   res.render('login');
});

//Success   added
app.get("/success", (req, res) => {
    res.render('success');
 });

app.post('/login', async (req, res) => {
   const {email, password} = req.body;

   let users = await User.getUsersData();
   let user = users.find(u => u.email === email);

   if (!user) {
       return res.redirect('/login');
   }

   const isMatch = bcrypt.compare(password, user.password);

   if (!isMatch) {
       return res.redirect('/login');
   } else {
       req.session.isAuth = true;
       res.redirect('/dashboard');
   }
})

//Register
app.get("/signup", (req, res) => {
   res.render('signup');
});

app.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    let users = await User.getUsersData();
    let user = users.find(u => u.username === username || u.email === email);

    if (user) {
        return res.redirect('/signup');
    }

    const hashedPwd = await bcrypt.hash(password, 12);

    user = new User(username, email, hashedPwd);
    await User.addUser(user); // Here the user gets saved to "database" (public/data/users.json)
    res.redirect('/login');
})

//Logout
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/');
    })
})

//Delete??

//Weather endpoint fetches Weater API data: weather.js
app.get("/weather", async (req, res) => {
   
   const weatherAPIKey = "6ff36079724c0020a2809278b13da9ac";
   const city = req.query.city;     // query parameter to get city
   
   axios.get("https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + weatherAPIKey + "&q=" + city)
      .then(result =>{   
         let filteredweatherData = {
            "temperature": result.data.main.temp,
            "wind": result.data.wind.speed,
            "city": result.data.name,
            "day": new Date().toLocaleDateString('en-EN', {"weekday": "long"}),
            "humidity": result.data.main.humidity
         };         
         res.json(JSON.stringify(filteredweatherData))
         console.log(result.data);
      })
      .catch((error) => console.error("Fetch weather API data error:", error));
});

//CurrencyConverter endpoint fetches currency API data: currencyconvert.js
app.get("/currencyconverter", async (req, res) => {
    const currencyConverterAPIKey = "5f5403539aa12de9ad707096ee0601c8";
     
    axios.get("http://data.fixer.io/api/latest?access_key=" + currencyConverterAPIKey)
       .then(result =>{   
          let filteredCurrencyData = {
             //"date": result.data.date,
             "rates": result.data.rates
          };         
          res.json(JSON.stringify(filteredCurrencyData))
          console.log(result.data);
          console.log(filteredCurrencyData);
       })
       .catch((error) => console.error("Fetch currency API data error:", error));
 });

// Start the server
app.listen(3000);
console.log('Server is running on http://localhost:3000');

