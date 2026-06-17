const User = require("../models/user");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");

// forgot password , verifyOTP , reset password
exports.forgotPassword = async(req , res)=>{
    try{
        const{email} = req.body;
        // find the user 
        const user = await User.findOne({email});
        if(!user){
            return res.send("User do not exist");
        }
        
        // generate otp
        const otp = Math.floor(
            100000+Math.random()*900000
        ).toString();
        // save otp in database
        user.otp = otp;
        user.otpExpiry = Date.now() + 5*60*1000;

        await user.save();
        await mailSender(email , otp);
        console.log("Generate OTP: " , otp);

        return res.redirect(`/verify-otp?email=${encodeURIComponent(email)}`);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Internal server error");
    }

};
exports.verifyOtp = async(req , res)=>{
    try{
        const {email , otp} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.send("User Not Found");
        }
        if(user.otp !== otp){
            // return res.status(400).json({
            //     success:false,
            //     message:"Invalid otp"
            // });
            return res.send("Invalid OTP");
        }
        // if the otp got expired or not
        if(user.otpExpiry < Date.now()){
          
            return res.send("OTP Expired");
        }

        res.redirect(`/reset-password?email=${encodeURIComponent(email)}`);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};
exports.resetPassword = async(req , res)=>{
    try{
        const {email , password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.send("User not Found");

        }
        // hashed the password
        const hashedPassword = await bcrypt.hash(password,10);
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        res.redirect("/login");
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error")
    }
};
