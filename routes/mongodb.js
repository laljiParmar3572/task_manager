const express=require('express');
const ttlModel=require('../model/ttl.js');
const router=express();
router.use(express.json());

router.post('/api/ttl',async(req,res)=>{
    const ttlModel1=await ttlModel.create({name:'lalji'});
    res.status(200).json({msg:"Done"});
});
module.exports=router;