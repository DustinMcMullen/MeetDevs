const express = require('express');
// to use Express Router
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const {check, validationResult} = require('express-validator'); 

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, async function (req, res) {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);
        if(!profile) {
            res.status(400).json({msg: "No profile matching user in the database."});
        }
        else{
            res.json(profile);
        }
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Error with Server");
    }
});



// @route   Post api/profile
// @desc    Create or update profile for logged in user
// access   Private
router.post("/",
[auth, [
    check('status', "status is required").not().isEmpty(),
    check('skills', "skills are required").not().isEmpty()
] ], async function (req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const {
            company,
            website,
            location,
            status,
            skills,
            bio,
            githubusername,
            youtube,
            twitter,
            facebook,
            linkedin,
            instagram
        } = req.body;

        // Building profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(status) profileFields.status = status;
        if(bio) profileFields.bio = bio;
        if(githubusername) profileFields.githubusername = githubusername;
        if(skills) profileFields.skills = skills.split(',').map((skills) => skills.trim());

        // Building social object
        profileFields.social = {};
        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
        if(linkedin) profileFields.social.linkedin = linkedin;
        if(instagram) profileFields.social.instagram = instagram;
        
        try {
            let profile = await Profile.findOne({user: req.user.id});
            if(profile) {
                // Update Profile
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                );
                return res.json(profile);
            }
            if(!profile) {
                // create profile
                const newProfile = new Profile (profileFields);
                await newprofile.save();
                return res.json(profile);
            }
        }
        catch(err) {
            console.error(err.message);
            res.status(500).send("Eror with Server");
        }
    }
});

module.exports = router;

