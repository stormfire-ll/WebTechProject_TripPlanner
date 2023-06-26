const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require("body-parser");
const axios = require('axios')

// Serve static views from the "public" directory
app.use(express.static(path.join(__dirname, '/public')));   // Maksym
app.use(express.static(path.join(__dirname, '/server')));   // Ting


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

//WeatherAPI: 1. weather.ejs
app.get("/weather", async (req, res) => {
   
   const weatherAPIKey = "17dc0ef21a4041da85d6fa0e6119fe49";
   const city = req.query.city;     // query parameter to get city
   
   const cityWeather = axios.get("https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + weatherAPIKey + "&q=" + city)
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






// Start the server
app.listen(3000);
console.log('Server is running on http://localhost:3000');

