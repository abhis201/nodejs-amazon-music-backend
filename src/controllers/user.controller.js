const User = require('../models/User');

const registerUser = async(req, res) => {
    const userid = req.body.userid;
    const password = req.body.password;

    try{
    const adduser = new User({'userid':userid,'password':password})
    const user = await adduser.save();
    res.send(user);
    }
    catch(err){
        res.send(err.message);
    }
};

const UserController = {
    registerUser
};

module.exports = UserController;