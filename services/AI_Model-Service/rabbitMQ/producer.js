const amqp = require('amqplib')

let channel = null

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://localhost:5672')
    channel = await connection.createChannel()

    // Create EXCHANGE
    await channel.assertExchange('AI_Model_Exchange', 'direct', {
      durable: true
    })

    // 🆕 CREATE QUEUE AND BIND IT
    const queueName = 'AI_Model_Queue'
    await channel.assertQueue(queueName, { durable: true })
    await channel.bindQueue(queueName, 'AI_Model_Exchange', 'AI_Model_Routing_Key')

    console.log('✅ Connected to RabbitMQ with Exchange & Queue')
    return channel
  } catch (error) {
    console.error('❌ RabbitMQ connection failed:', error)
    throw error
  }
}

async function sendToQueue(message, userId, userName) {
  try {
    if (!channel) {
      await connectRabbitMQ()
    }

    const messageObj = {
      message: message,
      userId: userId,
      userName: userName,
      timestamp: new Date()
    }

    const routingKey = 'AI_Model_Routing_Key'

    // Send to exchange with routing key
    const success = channel.publish(
      'AI_Model_Exchange',
      routingKey,
      Buffer.from(JSON.stringify(messageObj)),
      { persistent: true }
    )

    if (success) {
      console.log(`📨 Message sent to ${routingKey} for user:`, userId)
    } else {
      throw new Error('Failed to publish message to RabbitMQ')
    }
  } catch (error) {
    console.error('❌ Failed to send to queue:', error)
    throw error
  }
}

module.exports = { sendToQueue, connectRabbitMQ }