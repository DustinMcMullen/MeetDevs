const express = require('express');
// to use Express Router
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('config');
const {check, validationResult} = require('express-validator');






// @route   GET api/auth
// @desc    Login
// @access  Private
router.get("/", 
auth, async function (req, res) {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } 
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});




// // @Route   POST api/users
// // @Desc    Login User
// // @access  Public
router.post("/", [
    // Email must be a valid email
    check('email', "Please include a valid email").isEmail(),
    // Check for password
    check('password', "Password is required").exists()
],
function (req, res){
    const errors = validationResult(req);
    // if you use if(errors) it'll send an empty array
    if (!errors.isEmpty()) {
        // sends the error of 400 (bad request) & the errors in a json formatted array
        return(res.status(400).json({errors: errors.array()}))
    }
    // destructure & save items from request as variables
    const {email, password} = req.body;

    // find a user in the database with email matching that givin in POST request
    User.findOne({email: email}, async function (err, foundUsers){
        if(err) {
            console.log(err.message);
            return res.status(500).send("error with server");
        }

        else if(!foundUsers) {
            return res.status(200).send("User is not registered, please check email & password, or register new account.")
        }

        else if(foundUsers) {
            isMatch = await bcrypt.compare(password, foundUsers.password);
                if(!isMatch){
                    return res.status(400).json({errors: [ {msg: "incorrect password"} ] });
                }
                else if(isMatch) { 
                    const payload = {
                        user: {
                            id: foundUsers._id
                        }
                    };
                    jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000}, function (err, token) {
                        if (err) throw (err);
                        res.json({token});
                    });
                } 
        }

    });
});

module.exports = router;