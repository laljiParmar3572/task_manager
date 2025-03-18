const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique:true,
    },
    user_name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    completed_task:Number,
    pending_task:Number,
    total_task:Number
});

;

UserSchema.methods.matchPassword = async function (enteredPassword) {
    const value= bcrypt.compareSync(enteredPassword, this.password)
    const enteredPasswordIs=await bcrypt.matchPassword;
    console.log('compare password',value);
    console.log('password is --->',this.password);
    console.log('enter passwrodd',enteredPassword);
    console.log('enter passwrodd',enteredPasswordIs);
  
    return  bcrypt.compareSync(enteredPassword, this.password);
  };
  
  UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

module.exports=mongoose.model("users",UserSchema);