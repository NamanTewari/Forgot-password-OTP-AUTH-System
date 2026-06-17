const nodemailer = require("nodemailer");

const mailSender = async(email , otp)=>{
    try{
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });

        const info = await transporter.sendMail({
            from:process.env.MAIL_USER,
            to:email,
            subject:"OTP for Password Reset",
            html:`
            <h2>Password Reset OTP</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP is valid for 5 minutes.</p>
            `
        });
        console.log("Email send :" , info.messageId);
    }
    catch(err){
        console.log(err);
        throw err;
    }

};

module.exports = mailSender;