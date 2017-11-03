const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const config = require('../config/database');
const bcrypt = require('bcrypt-nodejs');

module.exports = (passport) => {
  // LocalStrategy
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email , password, done) => {
    // match username
    console.log('hola');
    let query = {email: email};
    User.findOne(query, (err , user) => {
      if (err) {
        throw err;
        console.log(err);
      }
      if (!user) {
        return done(null , false, {
          message: 'User does not exist',
        })
      }
      console.log('good to go');
      // match password
      bcrypt.compare(password , user.password,(err, isMatch) => {
        if (err) {
          throw err;
          console.log(err);
        }
        if (isMatch) {
          return done(null , user);
        }
        else {
          return done(null , false, {
            message: 'Password does not match',
          })
        }
      })
    })
  }))

  passport.serializeUser((user, done) => {
    done(null , user.id);
  })
  passport.deserializeUser((id , done) => {
    User.findById(id , (err , user) => {
      console.log(err);
      done(err , user);
    })
  })

}
