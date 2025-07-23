const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User')

const login = async(req, res) => {
    const userid = req.body.userid;
    const password = req.body.password;

    try{
        const getuser = await User.findOne({'userid':userid});
        if(!getuser) return res.send("User Not Present! Please Register");
        const pass = await bcrypt.compare(password,getuser.password);

        const token = await jwt.sign(getuser._id.toJSON(),process.env.SECRET_KEY);
        
        if(pass){
            console.log(token);
            res.header({'token':token}).send(`Login Successful \nToken: ${token}`);
        }
        else{
            res.status(401).send("Wrong Credentials");
        }
    }catch(err){
        console.log(err);
        res.send(err.message);
    }
};


const AuthController = {
    login
};

module.exports = AuthController;