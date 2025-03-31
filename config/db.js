require('dotenv').config();
const mongoose = require('mongoose');

const connectDB=async()=>{
    try{
      const uri = process.env.DB_URI.replace("${DB_PASSWORD}", process.env.DB_PASSWORD);

    await mongoose.connect(uri);
    console.log('connected');
    }catch(error){
        console.log('error --->',error);
    }
}

module.exports=connectDB;

