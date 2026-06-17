const User = require("../models/user");
const jwt= require("jsonwebtoken");

const bcrypt = require("bcrypt");


exports.register = async(req , res)=>{
    // fetch the data
   try{

     const {name , email , password } = req.body;
    // check if the email exist or not
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            message:"User Already exist"
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        name ,
        email,
        password:hashedPassword,
        role:"User",
    });
    res.redirect("/login");

   }
   catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
   }
};

exports.login = async(req , res)=>{
    try{
        // fetch the mail and password
        const {email , password} = req.body;
        // check for existing user or not
        const user = await User.findOne({email});
        if(!user){
            return res.send("User Do not exist ");
        }

        // check for password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.send("Incorrect Password");
        }

        // if password match generat a jwt token
        const token = jwt.sign(
            {
                id:user._id,
                role:user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        );
        // send cookies
        res.cookie("token" , token,{
            httpOnly:true
        });

        if(user.role === "Admin"){
            return res.redirect("/admin-dashboard");
        }
        res.redirect("/user-dashboard");
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

exports.logout = (req,res)=>{
    res.clearCookie("token");
    res.redirect("/login");
}
exports.adminDashboard = async (req,res)=>{

   try{
     res.render("dashboard",{
        user:req.user
    });
   }

   catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
   }
};

exports.userDashboard = async (req, res) => {
    try {

        res.render("dashboard", {
            user: req.user
        });

    } catch (err) {

        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

exports.profile = async(req , res)=>{

    try{
        
        const user = await User.findById(req.user.id);
        // user come from middleware where we decode jwt
        res.render("profile",{
          user  
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};
