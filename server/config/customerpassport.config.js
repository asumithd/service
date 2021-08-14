var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const Customer = require('./../app/models/customer.model.js')


passport.use('userLocal', new LocalStrategy({
    usernameField: 'mobile',
    passwordField: 'password'
},
    function (username, password, done) {
        Customer.findOne({ mobile: username, uninum: password }, function (err, user) {
            if (err) { return done(err); }
            // Return if user not found in database
            if (!user) {
                return done(null, false, {
                    success: false,
                    message: 'Incorrect Credentials'
                });
            }
            // Return if password is wrong
            // if (!user.validPassword(password)) {
            //     return done(null, false, {
            //         message: 'OTP is wrong'
            //     });
            // }
            // If credentials are correct, return the user object
            return done(null, user);
        });
    }
));         