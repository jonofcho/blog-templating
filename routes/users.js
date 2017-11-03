var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/User');
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// register form
router.get('/register', (req, res) => {
  res.render('register');
})

router.post('/register', (req , res) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  req.checkBody('name', 'name is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  let errors = req.validationErrors();
  if (errors) {
    res.render('register', {
      errors: errors
    })
  }
  else {
    let newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
    });

    bcrypt.genSalt(10, (err , salt) => {
      bcrypt.hash(newUser.password , salt, null, (err , hash) => {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save((err) => {
          if (err) {
            console.log(err);
            return
          }
          else {
            res.render('login');
          }
        });
      });
    })
  }

})

router.get('/login', (req, res) => {
  res.render('login');
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res ,next);
})
module.exports = router;
