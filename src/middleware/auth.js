require("dotenv").config()
const jwt = require('jsonwebtoken')


const auth = async(req,res,next)=>{

    const token = req.header('token');
    if(!token) return res.status(401).send("Access Denied");

    try {
        const verified = await jwt.verify(token,process.env.SECRET_KEY);
        req.user = verified;
        console.log("authenticated: "+req.user);
        next();
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}

module.exports = auth;