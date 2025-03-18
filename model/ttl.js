const mongoose=require('mongoose');
const ttlSchema=mongoose.Schema({
    'name':String,
    'date':{
        type:Date,
        default:Date.now,
    }
});
ttlSchema.index({ date: 1 }, { expireAfterSeconds: 1 });
const ttlModel=mongoose.model('ttl_model',ttlSchema);

module.exports=ttlModel;