const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Get token from Header
    const token = req.header('x-auth-token');

    // Check if no token (401 status means access forbidden)
    if(!token){
        return res.status(401).json({msg: "No token, authorization denied"});
    }

    // Verify Token
     try{
        //  pass token & secret into jwt.verify() method to verify & decode.
        const decodedToken = jwt.verify(token, config.get('jwtSecret'));
        req.user = decodedToken.user;
        console.log("middleware/auth.js works");
        console.log(decodedToken);
        next();
     }
        catch (err) {
            res.status(401).json({msg: "Token is not valid"});
            console.log("issue with middleware/auth.js");
        }
}