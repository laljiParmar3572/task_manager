const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
      const url='mongodb+srv://ral_developer:Raxu@@0609@test.sjc45.mongodb.net/?retryWrites=true&w=majority&appName=test';
    await mongoose.connect(url);
    console.log('connected');
    }catch(error){
        console.log('error --->',error);
    }
}

module.exports=connectDB;

