const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/user.js');
const nodemailer = require('nodemailer');
const router = express();
router.use(express.json());
const otpStore = new Map();
const transPort = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, secure: true,
    auth: {
        user: 'laljiparmar11221@gmail.com',
        pass: 'sxxqhaqqmvglwypy'
    }
})
const sendMail=async(email,otp)=>{
const mailOption={
to:`<${email}>`,
from:'<pl5961@gmail.com>',
subject:"Otp verfication",
html: `<p>Your OTP code is ${otp} this will be exprie in 10 minutes`,
};
await transPort.sendMail(mailOption);
}
router.post('/api/register', async (req, res) => {
    console.log('Register API is called');
    try {

        const { email, userName, password } = req.body;

        // Validate required fields
        if (!email || !userName || !password) {
            console.log('Missing required fields');
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }

        // Validate email format (assuming a valid isEmail method)
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            console.log('Invalid email format');
            return res.status(400).json({ success: false, msg: "Please enter a valid email" });
        }

        // Validate password length
        if (password.length < 8) {
            console.log('Password too short');
            return res.status(400).json({ success: false, msg: "Password must be at least eight characters" });
        }

        // Check if user already exists
        const exist = await User.findOne({ email: email });
        if (exist) {
            console.log('User already exists');
            return res.status(409).json({ success: false, msg: "User already exists" });
        }

        // Create a new user
        const user = await User.create({ email, userName, password });
        res.status(201).json({ success: true, data: user });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
router.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, msg: "Please enter the required fields" });
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ success: false, msg: "User not found" });

        else if (!(await user.matchPassword(password))) {
            return res.status(400).json({ success: false, msg: "Incorrect username or password" });
        }

        const token = jwt.sign({ id: user._id }, '1a2b3c4d5e6f7g8h9i0jklmnopqrstuvwxyz1234567890ABCDEF', {
            expiresIn: '7d'
        });
        res.status(200).json({ success: true, token: token });
    } catch (error) {
        res.status(400).json({ success: false, error: error.toString() });
    }
});

router.post('/api/send-otp', async (req, res)  =>{
    try{
    const { email, name, password, total_task, pending_task, completed_task } = req.body;
    if (!email || !password) return res.status(200).json({ success: false, msg: "Please fill required fields" });
    const user = await User.findOne({ email: email });
    console.log('user -->',user);
    if (user) return res.status(400).json({ success: false, msg: "User already exist" });
  const otp=otpGenerator();
  storeOTP(email,otp);
  await sendMail(email,otp);
  res.status(200).json({success:true,msg:"Otp successfully send to your email account"});

    }catch(error){
        res.status(400).json({success:false,msg:error.toString()});
    }
});


const otpGenerator=()=>Math.floor(100000+Math.random()*900000);


const storeOTP=(email,otp)=>{
    otpStore.set(email,{
        otp,
        expire_in:Date.now()+10*60*1000
    });
}

router.post('/api/verify-otp',async (req,res)=>{
    const {email,otp}=req.body;
    const record=otpStore.get(email);
    if(record.otp==otp && record.expire_in>Date.now()) return res.status(200).json({success:true,msg:"verify successfully"});
    if(record.expire_in<Date.now()) return res.status(400).json({success:false,msg:"Otp is expired"});
    res.status(400).json({success:false,msg:"Invalid otp"});
});
module.exports = router;