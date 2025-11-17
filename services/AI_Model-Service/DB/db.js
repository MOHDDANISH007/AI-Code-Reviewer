const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


// connect to mongoDB with docker image
const connectDB = async () => {
  try {
    // Add connection options for better stability
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;