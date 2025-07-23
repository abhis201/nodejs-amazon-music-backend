const playlist = require('./Playlist');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    userid:{
        type:String,
        required:true,
        unique:[true,'User with this id already exists']
    },
    password:{
        type:String,
        required:true,
    },
    playlist:[{
        type:{type:mongoose.Schema.Types.ObjectId, ref:playlist}
    }]
})

UserSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next()
})

const usermodel = mongoose.model('Users',UserSchema);

module.exports = usermodel;