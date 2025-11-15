const express = require('express');


const { sendToQueue } = require('../rabbitmq/producer.js');
const router = express.Router();



router.post('/run', async (req, res) => {
    try{
        const {code, language} = req.body;
        const userId = "123RabbitMQ"
        
        // Send to queue with user info
        await sendToQueue(code, language, userId);

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

module.exports = router