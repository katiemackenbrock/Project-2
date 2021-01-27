const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

// mounted at /auth

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

// Sign up POST route
router.post('/signup', (req, res, next) => {
  db.user.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(([user, created]) => {
    if (created) {
      console.log(`😎${user.name} was created`);
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Successful account creation'
      })(req, res, next);
    } else { 
    console.log(`🤬 ${user.name} already exists!`);
    req.flash('error', 'Email already exists')
    res.redirect('/auth/signup');
    }
  }).catch(err => {
    console.log(`🐻 Bad news bears, there's an error!`);
    console.log(err);
    req.flash('error', err.message);
    res.redirect('/auth/signup');
  })
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

// make passport do the login stuff
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth/login',
  successRedirect: '/',
  failureFlash: 'Invalid login credentials',
  successFlash: 'Successfully Logged In'
}));

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Thanks see ya soon!')
  res.redirect('/');
});

module.exports = router;
