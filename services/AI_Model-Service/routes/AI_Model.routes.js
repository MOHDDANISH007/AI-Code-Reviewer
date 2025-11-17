const express = require('express')
const { sendToQueue } = require('../rabbitMQ/producer.js')

const router = express.Router()

router.post('/run', async (req, res) => {
  try {
    const { message, userID, userName } = req.body

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