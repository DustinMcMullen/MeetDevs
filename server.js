const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", function(req, res){
    res.send("API Running");
});

app.listen(PORT, function(){
    console.log("server started on port " + PORT);
});