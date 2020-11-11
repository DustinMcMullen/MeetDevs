const express = require('express');
// to use Express Router
const router = express.Router();
// to use express vlidator
const {check, validationResult} = require('express-validator');
// Importing User model (../ transverses up a level in the files)
const User = require('../../models/Users');

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

    User.find({}, function (err){
        if(err) {
            console.log(err);
        }
        else {
            return(res.send("Find works"));
        }

    });


    // else {
        res.send("user route")

    // }
});

module.exports = router;