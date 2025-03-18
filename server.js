const express = require('express');
const router = require('./routes/index.js');
const connectDB = require('./config/db.js');
const app = express();
app.use(router);
app.use(express.json()); // To parse JSON payloads
connectDB();
app.listen(5000, () => {
    console.log('server is running');
});
