const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

// Serve static views from the "public" directory
app.use(express.static(path.join(__dirname, '/public')));
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

// Start the server
app.listen(3000);
console.log('Server is running on http://localhost:3000');

