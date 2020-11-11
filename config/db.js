const mongoose = require('mongoose');
const config = require('config');

// Use config package & .get method to create a variable with the mongoDB string from default.json file
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
        console.log("Mongo DB connected...")
    }
    catch(err) {
        console.log(err.message);
        // Exit process with failure of connection
        process.exit(1);
    }
}

module.exports = connectDB;
