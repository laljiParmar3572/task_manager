const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
      const url='mongodb+srv://ral_developer:Raxu@@0609@test.sjc45.mongodb.net/?retryWrites=true&w=majority&appName=test
    await mongoose.connect("mongodb://localhost:27017/task");
    console.log('connected');
    }catch(error){
        console.log('error --->',error);
    }
}

module.exports=connectDB;

