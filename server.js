require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const axios = require('axios');
const cocktailSearchURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
const ingredientSearchURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka`;
const session = require('express-session');
const flash = require('connect-flash');
const helmet = require('helmet');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
// allows us to read form sent body data
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(helmet());

app.use(session({
  secret: process.env.SESSION_SECRET, // should be an ENV variable
  resave: false,
  saveUninitialized: true
}));

// Init passport config MUST HAPPEN AFTER SESSION CONFIG
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Write custom middleware to access the user on every response
app.use((req, res, next) => {
  let alerts = req.flash();
  console.log(alerts);
  res.locals.alerts = alerts;
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

app.get('/search', (req, res) => {
  res.render('search')
});

app.post('/search', (req, res) => {
  console.log(req.body);
})

// axios.get(cocktailSearchURL)
//   .then(response => {
//     console.log(response.data);
//   }).catch(err => {
//     console.log(err);
//   });

app.use('/auth', require('./routes/auth'));

var server = app.listen(process.env.PORT || 3000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 3000}🎧`));

module.exports = server;
