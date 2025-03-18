const jwt = require('jsonwebtoken');
const rateLimiter = require('express-rate-limit');
const tokenVerify = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('token --->', token);
  try {
    jwt.verify(token, '1a2b3c4d5e6f7g8h9i0jklmnopqrstuvwxyz1234567890ABCDEF');
    next();
  } catch (error) {
    console.log('error ---->', error);
    const message = error.name === 'TokenExpiredError'
      ? 'Token expired'
      : 'Invalid token';
    res.status(401).json({ success: false, message });
  }
}

const emailRateLimiter=rateLimiter({
  window:60*1000,
  max:5,
  message:{
    success:false,
    msg:"To many attemps.Please try after 10 mins"
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,
})

module.exports = { tokenVerify,emailRateLimiter };