const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config');


// create login strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    // Verify email and password, call done with the user
    // If it is correct email and password
    // Otherwise call done with false
    User.findOne({email: email}, function(err, user){
        if(err) return done(err);
        if(!user) return done(null, false);

        // compare password - is given password match that user password
        user.comparePassword(password, function(err, isMatch){
            if(err) return done(err);

            if(!isMatch) return done(null, false);

            return done(null, user);
        });
    })
})


// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};


// Create JWT Sreategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // see if the user id in the payload exist in our database
    User.findById(payload.sub, function(err, user){
        if(err) return done(err, false);

        // If it exist, call done with 'user' object
        // Otherwise call done without a 'user' object
        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
    });
});

// Tell passport use startegy
passport.use(localLogin);
passport.use(jwtLogin);