const express = require('express');
const { sendToQueue } = require('../rabbitmq/producer.js');
const { verifyToken } = require('../middleware/verification_user.js');
const router = express.Router();

// 🚨 TEMPORARY DEBUG MIDDLEWARE
// const debugMiddleware = (req, res, next) => {
//   console.log('=== DEBUG: REQUEST ENTERED ROUTE ===');
//   console.log('URL:', req.url);
//   console.log('Method:', req.method);
//   console.log('Headers:', req.headers);
//   console.log('Authorization header:', req.headers.authorization);
//   next();
// };

router.post('/run',  verifyToken, async (req, res) => {
    try{
        console.log('=== DEBUG: INSIDE ROUTE HANDLER ===');
        console.log('Request user:', req.user);
        console.log('User ID from JWT:', req.user?.userId);
        
        // 🚨 BLOCK IF NO USER FROM JWT
        if (!req.user || !req.user.userId) {
            console.log('❌ NO USER ID FROM JWT - STOPPING REQUEST');
            return res.status(401).json({ error: 'Authentication failed - no user ID from JWT' });
        }
        
        const {code, language} = req.body;
        const userId = req.user.userId;
        const userName = req.user.username;

        console.log('✅ Using REAL User ID from JWT:', userId);
        
        await sendToQueue(code, language, userId, userName);

        res.status(200).json({ 
            message: 'Code submitted successfully',
            status: 'queued'
        });
    }
    catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to queue code' });
    }
})

module.exports = router;