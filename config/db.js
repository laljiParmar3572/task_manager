const mongoose=require('mongoose');

const connectDB=async()=>{
    const uri = "mongodb+srv://ral_developer:Raxu@@0609@test.sjc45.mongodb.net/?appName=test";
    try{
    await mongoose.connect("mongodb://localhost:27017/task");
    console.log('connected');
    }catch(error){
        console.log('error --->',error);
    }
}

module.exports=connectDB;

