const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../model/user.js');
const jwt = require('jsonwebtoken');
const router = express();

router.get('/api/user-details', async (req, res) => {
  const user_id = req.query.user_id;
  console.log('user_id is ', user_id);
  const user = await User.findById(user_id);
  res.status(200).json({ success: true, data: user });
});

router.post('/api/add-user', async (req, res) => {
  try {
    const { email, username, password, total_task, pending_task, completed_task } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, msg: "Please fill required fields" });
    const user = await User({ email: email, password: password, user_name: username, total_task: total_task, pending_task: pending_task, completed_task: completed_task });
    const newUser = await user.save();
    console.log("new user ", newUser);
    if (newUser) {
      res.status(200).json({ success: true, token: token, user_data: newUser });

    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error.toString() });
  }

});



module.exports = router;
