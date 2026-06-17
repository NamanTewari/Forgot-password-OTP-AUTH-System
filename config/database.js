const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DATABASE CONNECTION SUCCESS");
    }
    catch(err){
        console.log("DATABASE CONNECTION FAILED");
        process.exit(1);
    }
};

module.exports = connectDB;