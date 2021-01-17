const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth.js');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');



// @Route   Post api/posts
// @Desc    Create a Post
// @access  Private
router.post("/", [auth, [
    check('text', "Text is required").not().isEmpty()

] ], async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({errors: errors.array()});
    }
    else{
        try{
            const user = await User.findById(req.user.id).select('-password');
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
             });
            const saveNewPost = await newPost.save();
            res.json(saveNewPost);
        }
        catch(err){
            console.error(err.message);
            res.status(500).send("Error with Server");
        }
    }
});



// @Route   Get api/posts
// @Desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
    try{
        const posts = await Post.find().sort({date: -1});
        res.json(posts);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Error with Server");
    }
});



// @Route   Get api/posts/:id
// @Desc    Get post by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({msg: "No post found"});
        }
        else{
            res.json(post);
        }
    }
    catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            res.status(404).json({msg: "No post found"});
        }
        else{
            res.status(500).send("Error with Server");
        }
    }
});



// @Route   Delete api/posts/:id
// @Desc    Delete post by ID
// @access  Private
router.delete('/:id', auth, async (req, res) =>{
    try{
        const postToDelete = await Post.findById(req.params.id);
        if (!postToDelete) {
            res.status(404).json({msg: "No post found"});
        }
        else{
            if(postToDelete.user.toString() !== req.user.id) {
                res.status(401).json({msg: "User not authorized"});
            }
            else{
                await postToDelete.remove();
                res.send("Post deleted");
            }     
        }
    }
    catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            res.status(404).json({msg: "No post found"});
        }
        else{
            res.status(500).send("Error with Server");
        }
    }
});



// @Route   Put api/posts/like/:id
// @Desc    like a post
// @access  Private
router.put('/like/:id', auth, async (req, res)=>{
    try{
        const postToLike = await Post.findById(req.params.id);
        // filters the array of likes to find those by the current user
        const likesByCurrentUser = postToLike.likes.filter(like=>like.user.toString() === req.user.id);
        if(likesByCurrentUser.length > 0) {
            return res.status(400).json({msg: "Post already liked"});
        }
        else{
            postToLike.likes.unshift({user: req.user.id});
            await postToLike.save();
            res.json(postToLike.likes);
        }
    }
    catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            res.status(404).json({msg: "No post found"});
        }
        else{
            res.status(500).send("Error with Server");
        }
    }
});



// @Route   Put api/posts/unlike/:id
// @Desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res)=>{
    try{
        const postToUnlike = await Post.findById(req.params.id);
        // filters the array of likes to find those by the current user
        const likesByCurrentUser = postToUnlike.likes.filter(like=>like.user.toString() === req.user.id);
        if(likesByCurrentUser.length === 0) {
            return res.status(400).json({msg: "Post has not yet been liked"});
        }
        else{
            // get index of like to remove
            const indexOflikeToRemove = postToUnlike.likes.map(like=> like.user.toString()).indexOf(req.user.id);
            postToUnlike.likes.splice(indexOflikeToRemove, 1);
            await postToUnlike.save();
            res.json(postToUnlike.likes);
        }
    }
    catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            res.status(404).json({msg: "No post found"});
        }
        else{
            res.status(500).send("Error with Server");
        }
    }
});



// @Route   Post api/posts/comment/:id
// @Desc    Post a comment to a post
// @access  Private
router.post("/comment/:id", [auth, [
    check('text', "Text is required").not().isEmpty()

] ], async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({errors: errors.array()});
    }
    else{
        try{
            const user = await User.findById(req.user.id).select('-password');
            const postTocomment = await Post.findById(req.params.id);
            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
             };

            postTocomment.comments.unshift(newComment);
            await postTocomment.save();

            res.json(postTocomment.comments);
        }
        catch(err){
            console.error(err.message);
            res.status(500).send("Error with Server");
            console.log("called to API but didn't send correct data to API");
        }
    }
});



// @Route   Delete api/posts/comment/:id/:comment_id
// @Desc    Delete a comment from a post
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {

    try{
        const postWithComment = await Post.findById(req.params.id);
        console.log("post with comment: " + postWithComment);
        const commentToDelete = postWithComment.comments.find(comment => comment.id.toString() === req.params.comment_id);
        console.log("comment to delete: " + commentToDelete);

        if(!commentToDelete) {
            return res.status(404).json({msg: "Comment not found"});
        }

        if(commentToDelete.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "user not authorized"});
        }
    
        const indexOfCommentToDelete = postWithComment.comments.map(comment=> comment.id.toString()).indexOf(req.params.comment_id);
        console.log("index of comment to delete: " + indexOfCommentToDelete);
        postWithComment.comments.splice(indexOfCommentToDelete, 1);
        await postWithComment.save();
    
        res.json(postWithComment.comments);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Error with Server");
    }
});



module.exports = router;