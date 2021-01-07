const express = require('express');
// to use Express Router
const router = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const config = require('config')
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const {check, validationResult} = require('express-validator'); 
const { response } = require('express');



// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, async function (req, res) {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('User', ['name', 'avatar']);
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
                await newProfile.save();
                return res.json(profile);
            }
        }
        catch(err) {
            console.error(err.message);
            res.status(500).send("Eror with Server");
        }
    }
});



// @route   Get api/profile
// @desc    get ALL profiles
// @access  public
router.get("/", async function (req, res) {
    try {
        const allProfiles = await Profile.find().populate('User', ['name', 'avatar']);
        res.json(allProfiles);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Error with Server");
    }
});



// @route   Get api/profile/user/:user_Id
// @desc    get profile by userId
// @access  public
router.get("/user/:user_Id", async function (req, res) {
    try {
        const userProfile = await Profile.findOne({user: req.params.user_Id});
        if (!userProfile) {
            return res.status(400).json( {msg: "No profile found"});
        }
        else {
            res.json(userProfile);
        }
    }
    catch(err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json( {msg: "No profile found"});
        }
        else{
            res.status(500).send("Error with Server");
        }
    }
});



// @route   DELETE api/profile
// @desc    delete user profile & posts
// @access  private
router.delete("/", auth, async function (req, res) {
    try {
        await Profile.findOneAndDelete({user: req.user.id}, );
        await User.findOneAndDelete({_id: req.user.id}, );
        res.json({msg: "user & profile deleted"})
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Error with Server");
    }
});



// @route   Put api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.put("/experience", [auth, [
    check('title', "title is required").not().isEmpty(),
    check('company', "company is required").not().isEmpty(),
    check('from', "from date is required").not().isEmpty()  
]], async function (req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    else{
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExperience = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };

        try{
            const profileToUpdate = await Profile.findOne({user: req.user.id});
            profileToUpdate.experience.unshift(newExperience);
            await profileToUpdate.save();
            res.json(profileToUpdate);
        }
        catch(err) {
            console.error(err);
            res.status(500).send("Error with Server");
        }
    }
});



// @route   DELETE api/profile/experience/:experience_id
// @desc    delete experience
// @access  private
router.delete("/experience/:experience_id", auth, async function (req, res) {
    try {
        const profile = await Profile.findOne({user: req.user.id});

        const indexToRemove = await profile.experience.map(item => item.id).indexOf(req.params.experience_id);
        console.log("Index of removed experience: " + indexToRemove);
        if(indexToRemove < 0) {
            res.status(400).send("Experience not found");
        }
        else{
            profile.experience.splice(indexToRemove, 1);
            await profile.save();
            res.json(profile);
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Error with Server");
    }
});



// @route   Put api/profile/eductaion
// @desc    Add education to Profile
// @access  Private
router.put("/education", [auth, [
    check('school', "school is required").not().isEmpty(),
    check('degree', "degree is required").not().isEmpty(),
    check('fieldofstudy', "field of study is required").not().isEmpty(),
    check('from', "from date is required").not().isEmpty()  
]], async function (req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    else{
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEducation = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };

        try{
            const profileToUpdate = await Profile.findOne({user: req.user.id});
            profileToUpdate.education.unshift(newEducation);
            await profileToUpdate.save();
            res.json(profileToUpdate);
        }
        catch(err) {
            console.error(err);
            res.status(500).send("Error with Server");
        }
    }
});



// @route   DELETE api/profile/education/:education_id
// @desc    delete education from Profile
// @access  private
router.delete("/education/:education_id", auth, async function (req, res) {
    try {
        const profile = await Profile.findOne({user: req.user.id});

        const indexToRemove = await profile.education.map(item => item.id).indexOf(req.params.education_id);
        console.log("Index of removed education: " + indexToRemove);
        if(indexToRemove < 0) {
            res.status(400).send("Education not found");
        }
        else{
            profile.education.splice(indexToRemove, 1);
            await profile.save();
            res.json(profile);
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Error with Server");
    }
});

// @route   Get api/profile/github/:username
// @desc    get user repos from Github
// @access  Public
router.get("/github/:username", async function (req, res) {
    try {
        const uri = encodeURI(
            `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
          );
          const headers = {
            'user-agent': 'node.js',
            Authorization: `token, ${config.get('githubSecret')}`
          };
          const gitHubResponse = await axios.get(uri, { headers });
          return res.json(gitHubResponse.data);
        }
        catch (err) {
          console.error(err.message);
          return res.status(404).json({ msg: 'No Github profile found' });
        }
});


module.exports = router;

