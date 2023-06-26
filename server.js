const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios')
const session = require('express-session');
const bodyParser = require("body-parser");
const currencyModel = require("./public/javascript/currency-list.js");

// Serve static views from the "public" directory
app.use(express.static(path.join(__dirname, '/public')));

app.set('views', path.join(__dirname, '/public/html' ));
app.use(
    session({
       secret: 'some key',
       resave: false,
       saveUninitialized: false
    })
);
app.set('views', path.join(__dirname, '/public/views' ));
app.set('view engine', 'ejs');

// Other routes and middleware
app.get("/", (req, res) => {
   res.render('index');
});

app.get("/login", (req, res) => {
   res.render('login');
});

app.post('/login', async (req, res) => {
   res.render('dashboard');
})

app.get("/signup", (req, res) => {
   res.render('signup');
});

app.post('/signup', async (req, res) => {
   res.render('login');
})

//weather endpoint fetches Weater API data: weather.js
app.get("/weather", async (req, res) => {
   
   const weatherAPIKey = "6ff36079724c0020a2809278b13da9ac";
   const city = req.query.city;     // query parameter to get city
   
   axios.get("https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + weatherAPIKey + "&q=" + city)
      .then(result =>{   
         let filteredData = {
            "temperature": result.data.main.temp,
            "wind": result.data.wind.speed,
            "city": result.data.name,
            "day": new Date().toLocaleDateString('en-EN', {"weekday": "long"}),
            "humidity": result.data.main.humidity,
         };         
         res.json(JSON.stringify(filteredData))
         console.log(result.data);
      })
      .catch(error => {
            console.log(error);
      });
});

// //currency endpoint fetches currency API data: currencyconvert.js
// app.get("/currencyconverter", async (req, res) => {
//    const currencyAPIKey = "5f5403539aa12de9ad707096ee0601c8";
   
// const availableCurrencies = axios.get("http://data.fixer.io/api/symbols?access_key=" + currencyAPIKey)
//    .then(result =>{   
      
//       const movies = JSON.parse(data); //String -> JavaScript object
//       let allCurrencies = {

//       };         
//       res.json(JSON.stringify(allCurrencies))
//       console.log(result.data);
//    })
//    .catch(error => {
//          console.log(error);
//    });
   
//    const requestedCurrency = axios.get("http://data.fixer.io/api/latest?access_key=" + currencyAPIKey)
//       .then(result =>{   
//          let filteredData = {
//             "temperature": result.data.main.temp,
//             "wind": result.data.wind.speed,
//             "city": result.data.name,
//             "day": new Date().toLocaleDateString('en-EN', {"weekday": "long"}),
//             "humidity": result.data.main.humidity,
//          };         
//          res.json(JSON.stringify(filteredData))
//          console.log(result.data);
//       })
//       .catch(error => {
//             console.log(error);
//       });
//    //res.render('currencyconverter.html');
// });



// Start the server
app.listen(3000);
console.log('Server is running on http://localhost:3000');

