var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
require('./../models/player');
var Player = mongoose.model('Player');
var md5 = require('MD5');
/*
For loggin stratagy of user
 */
passport.use('login',new LocalStrategy({
    passReqToCallback : true
    },
    function(req,username, password, done) {
      Player.findOne({ username: username }, function (err, user) {
      if (err) { return done(err,false); }
      if (!user) {
        return done(null, false);
      }
      if(user.active === 0){
        return done(null,false);
      }
      if (user.password!=md5(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

/*
For login stratagy of admin
 */
passport.use('adminlogin',new LocalStrategy({
    passReqToCallback : true
    },
    function(req,username, password, done) {
    Player.findOne({ username: username }, function (err, user) {
      if (err) { return done(err,false); }
      if (!user) {
        return done(null, false);
      }
      if(user.active === 0)
        return done(null,false);
      if (user.password!=md5(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

/*
login Strategy for facebook
 */

// passport.use('facebook',new Strategy({
//     clientID: 1725730997681272,
//     clientSecret: "b2c98295b0c31156c5db16ef5bd46b01",
//     callbackURL: '/login/facebook/return',
//     profileFields: ['email','age_range','first_name','last_name','picture']
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     return cb(null, profile);
//   }));

/**
 * @param  {object}
 * @param  {funtiocn}
 * @return {function}
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

/**
 * @param  {object}
 * @param  {function}
 * @return {function}
 */
passport.deserializeUser(function(id, done) {
  Player.findById(id, function(err, user) {
    done(err, user);
  });
});
