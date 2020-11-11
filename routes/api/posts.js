const express = require('express');
// to use Express Router
const router = express.Router();

// @Route   GET api/posts
// @Desc    Test route
// @access  Public
router.get("/", function (req, res) {
    res.send("Posts route");
});

module.exports = router;