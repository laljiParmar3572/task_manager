const mongoose=require('mongoose');

const connectDB=async()=>{
    const uri = "mongodb://ral_developer:Raxu@@0609@test-shard-00-00.sjc45.mongodb.net:27017,test-shard-00-01.sjc45.mongodb.net:27017,test-shard-00-02.sjc45.mongodb.net:27017/?replicaSet=atlas-14i29i-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=test";
    try{
    await mongoose.connect("mongodb://localhost:27017/task");
    console.log('connected');
    }catch(error){
        console.log('error --->',error);
    }
}

module.exports=connectDB;

