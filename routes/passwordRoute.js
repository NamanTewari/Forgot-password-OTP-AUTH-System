const express = require("express");
const router = express.Router();

const {forgotPassword, verifyOtp, resetPassword} = require("../controllers/passwordController");

// render the pages 

router.get("/forgot-password", (req, res) => {
    res.render("forgotPassword");
});

router.get("/verify-otp", (req, res) => {
    res.render("verifyOtp", { queryEmail: req.query.email || "" });
});

router.get("/reset-password", (req, res) => {
    res.render("resetPassword", { queryEmail: req.query.email || "" });
});

// Form submission 

router.post("/forgot-password",forgotPassword);
router.post("/verify-otp"  ,verifyOtp);
router.post("/reset-password" , resetPassword);

module.exports = router;
