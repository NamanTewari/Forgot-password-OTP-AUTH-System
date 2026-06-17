const express = require("express");
const router = express.Router();

const{
    register,
    login,
    logout,
    userDashboard,
    adminDashboard,
    profile
} = require("../controllers/authController");

const {auth} = require("../middleware/auth");

// using ejs render both the pages 
router.get("/", (req , res)=>{
    res.render("login");
})
router.get("/register" , (req ,res)=>{
    res.render("register");
});

router.get("/login" , (req , res)=>{
    res.render("login");
});

router.post("/register" , register);
router.post("/login" , login);

router.get("/logout" , logout);

// protected routes
router.get("/admin-dashboard",auth , adminDashboard);
router.get(
    "/user-dashboard",
    auth,
    userDashboard
);

router.get(
    "/profile",
    auth,
    profile
);

module.exports = router;