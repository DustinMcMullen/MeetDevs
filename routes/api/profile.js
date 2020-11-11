const express = require('express');
// to use Express Router
const router = express.Router();

// @route   GET api/profile
// @desc    Test route
// @access  Public
router.get("/", function (req, res) {
    res.send("Profile route")
});

module.exports = router;