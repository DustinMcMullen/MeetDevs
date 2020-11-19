const express = require('express');
// to use Express Router
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
// to use express vlidator
const {check, validationResult} = require('express-validator');
// Importing User model (../ transverses up a level in the files)
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// // @Route   GET api/users
// // @Desc    Register User
// // @access  Public
router.post("/", [
    // Name must be included
    check('name', "Name is required").not().isEmpty(),
    // Email must be a valid email
    check('email', "Please include a valid email").isEmail(),
    // Password must be at least 6 characters long
    check('password', "Password must be at least 6 characters long").isLength({min:5})

],
function (req, res){
    const errors = validationResult(req);
    // if you use if(errors) it'll send an empty array
    if (!errors.isEmpty()) {
        // sends the error of 400 (bad request) & the errors in a json formatted array
        return(res.status(400).json({errors: errors.array()}))
    }
    // destructure & save items from request as variables
    const {name, email, password} = req.body;
    const userAvatar = gravatar.url(email, {s: '200', r: "pg", d: "mm"});

    // find a user in the database with email matching that givin in POST request
    User.findOne({email: email}, function (err, foundUsers){
        if(err) {
            console.log(err.message);
            return res.status(500).send("error with server");
        }
        else if(foundUsers) {
            console.log("user already exists");
            console.log(foundUsers);
            return res.status(500).json({errors: [ {msg: "User already exixsts in system"} ] });
        }
        else {

            bcrypt.hash(password, saltRounds, function (err, hash){
                const user = new User ({
                    name: name,
                    email: email,
                    password: hash,
                    avatar: userAvatar,
                });
                user.save()

                const payload = {
                    user: {
                        id: user._id
                    }
                };
    
                jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000}, function (err, token) {
                    if (err) throw (err);
                    res.json({token});
                });
            });

            

            console.log("Saved user: " + name);
            

        }

    });
});

module.exports = router;