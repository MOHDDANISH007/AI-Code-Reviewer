const express = require('express')

const { sendToQueue } = require('../rabbitMQ/producer.js')
const { verifyToken } = require('../middleware/authenticationVerify.js') // FIXED

const router = express.Router()

router.post('/run', verifyToken, async (req, res) => {
  try {
    const { message } = req.body
    const userID = req.user.userId
    const userName = req.user.username
    await sendToQueue(message, userID, userName)

    res
      .status(200)
      .json({ message: 'Message Submitted To Queue For Processing' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to process message' })
  }
})

module.exports = router
