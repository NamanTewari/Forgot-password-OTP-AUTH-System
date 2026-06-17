const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/database");
const PORT = process.env.PORT||4000;
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const passwordRoutes = require("./routes/passwordRoute");
const path = require("path");

// middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
connectDB();

app.use(cookieParser());

// Routes
app.use("/" , passwordRoutes);
app.use("/" , authRoutes);

// EJS
app.set("view engine" , "ejs");
app.set("views",
    path.join(__dirname , "views")
    
);

app.listen(PORT , ()=>{
    console.log(`Server running in ${PORT}`);
});

