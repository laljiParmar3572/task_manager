const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
    await mongoose.connect("mongodb://localhost:27017/task");
    console.log('connected');
    }catch(error){
        console.log('error --->',error);
    }
}

module.exports=connectDB;

