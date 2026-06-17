Forgot-Password-OTP-System/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── authController.js
│   └── passwordController.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   └── passwordRoutes.js
│
├── utils/
│   ├── mailSender.js
│   └── otpGenerator.js
│
├── views/
│   ├── register.ejs
│   ├── login.ejs
│   ├── forgotPassword.ejs
│   ├── verifyOtp.ejs
│   ├── resetPassword.ejs
│   └── dashboard.ejs
│
├── .env
├── .gitignore
├── package.json
└── server.js