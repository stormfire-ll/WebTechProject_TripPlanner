const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const session = require('express-session');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const fs = require("fs");
const JsonStore = require('express-session-json')(session);
class CustomJsonStore extends JsonStore {
    constructor(options) {
        super(options);
        this.initializeJsonFile();
    }

    initializeJsonFile() {
        try {
            const jsonData = fs.readFileSync(this.options.filename, 'utf8');
            if (jsonData.trim() === '') {
                fs.writeFileSync(this.options.filename, '{}');
            }
        } catch (err) {
            fs.writeFileSync(this.options.filename, '{}');
        }
    }
}

// Serve static views from the "public" directory
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser('some key'));

app.use(
    session({
       secret: 'some key',
       resave: false,
       saveUninitialized: false,
       store: new CustomJsonStore({
           filename: 'userdata.json',
           path: './public/data/',
       }),
    })
);
app.set('views', path.join(__dirname, '/public/views' ));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Other routes and middleware
app.get("/", (req, res) => {
    res.render('index');
});

app.get("/login", (req, res) => {
   res.render('login');
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
    await User.addUser(user);
    res.redirect('/login');
})

app.get('/dashboard', isAuth, (req, res) => {
    res.render('dashboard');
})

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/');
    })
})

// Start the server
app.listen(3000);
console.log('Server is running on http://localhost:3000');

