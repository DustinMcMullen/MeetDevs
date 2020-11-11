const express = require('express');
// to use Express Router
const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Private
router.get("/", function (req, res) {
    res.send("Auth route");
});

module.exports = router;