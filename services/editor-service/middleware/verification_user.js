const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
  console.log('=== MIDDLEWARE ENTERED ===');
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  console.log('Authorization Header:', authHeader);
  
  if (!authHeader) {
    console.log('❌ NO AUTHORIZATION HEADER - BLOCKING REQUEST');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : authHeader;

  console.log('Token extracted:', token);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret');
    console.log('✅ JWT DECODED SUCCESSFULLY:', decoded);
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ JWT VERIFICATION FAILED:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };