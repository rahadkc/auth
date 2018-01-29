const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


// Token for user
function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

// User signin using email and password
exports.signin = function(req, res, next){
    // we need to give user token
    res.send({token: tokenForUser(req.user)})
}

// user signup
exports.signup = function(req, res, next){
    // See if a user with given email exist
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({ error: "You must provide Email and Password" });
    }

    User.findOne({email: email}, function(err, existingUser){
        if(err) return next(err);

        // If user exist throw an error
        if(existingUser){
            return res.status(422).send({ error: "There is already an user with this email!" })
        }

        // If it doesn't create new user
        const user = new User({
            email: email,
            password: password
        });

        // save the user
        user.save(function(err){
            if(err) return next(err);

            // Respond to request indicating user was created
            res.json({ token: tokenForUser(user) });
        });
    })



}