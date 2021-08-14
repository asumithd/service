var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const User = require('./../app/models/user.model.js');
const Driver = require('./../app/models/driver.model.js');




passport.use('driver', new LocalStrategy({
  usernameField: 'email'
},
  function (username, password, done) {
    Driver.findOne({ email: username }, function (err, driver) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!driver) {
        return done(null, false, {
          message: 'Driver not found'
        });
      }
      // Return if password is wrong
      if (!driver.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, driver);
    });
  }
));



passport.use('local', new LocalStrategy({
  usernameField: 'email'
},
  function (username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));