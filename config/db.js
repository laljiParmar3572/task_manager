const mongoose=require('mongoose');

const connectDB=async()=>{
    const uri = "mongodb+srv://ral_developer:Raxu%40%400609@test.sjc45.mongodb.net/?retryWrites=true&w=majority&appName=test";
    try{
    await mongoose.connect(uri);
    console.log('connected');
    }catch(error){
        console.log('error --->',error);
    }
}

module.exports=connectDB;

