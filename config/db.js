const dotenv = require("dotenv");
const mongoose = require('mongoose');
dotenv.config();
const connectDB=async()=>{
    try{
      const uri = process.env.DB_URL.replace("${DB_PASSWORD}", process.env.DB_PASSWORD);
     console.log('uri is ---->',uri);
    await mongoose.connect(uri);
    console.log('connected');
    }catch(error){
        console.log('error --->',error);
    }
}

module.exports=connectDB;

