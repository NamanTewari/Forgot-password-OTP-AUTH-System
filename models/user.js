const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase :true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        default:null,
    },
    otpExpiry:{
        type:Date,
        default:null
    },
    role:{
        type:String,
        enum:["User" , "Admin"],
        default:"User"
    },
},
{
    timestamps:true
});

module.exports = mongoose.model("User" , userSchema);