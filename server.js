const express = require("express");
const app = express();
const connectDB = require("./config/db");
const {check, validationResult} = require('express-validator');

// connect database
connectDB();

app.use(express.json({ extended: true}));

app.get("/", function(req, res){
    res.send("API Running");
});

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, function(){
    console.log("server started on port " + PORT);
});

