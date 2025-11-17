const amqplib = require('amqplib')

let channel = null

async function connectRabbitMQ() {
  try {
    const connection = await amqplib.connect('amqp://localhost:5672')
    channel = await connection.createChannel()
    await channel.assertQueue('AI_Model_Queue', { durable: true })

    console.log('✅ Connected to RabbitMQ')
    return channel
  } catch (error) {
    console.error('❌ RabbitMQ connection failed:', error)
    throw error
  }
}

async function startConsumer() {
  try {
    if (!channel) {
      await connectRabbitMQ()
    }

    console.log('🔄 Waiting for messages in AI_Model_Queue...')

    channel.consume('AI_Model_Queue', async (msg) => {
      if (msg !== null) {
        try {
          const message = JSON.parse(msg.content.toString())
          console.log('📨 Received AI_Model message:', message)

          // ✅ PROCESS YOUR AI MODEL LOGIC HERE
          console.log('🤖 Processing AI Model for user:', message.userName)
          console.log('💬 Message:', message.message)
          
          // ✅ SIMULATE AI PROCESSING
          await new Promise(resolve => setTimeout(resolve, 2000))
          console.log('✅ AI Processing completed for user:', message.userName)

          // ✅ ACKNOWLEDGE MESSAGE - IMPORTANT!
          channel.ack(msg)
          console.log('✅ Message acknowledged')

        } catch (error) {
          console.error('❌ Failed to process AI_Model message:', error)
          // ✅ NEGATIVE ACKNOWLEDGE ON ERROR
          channel.nack(msg)
        }
      }
    })
  } catch (error) {
    console.error('❌ Consumer connection failed:', error)
    throw error
  }
}

module.exports = { connectRabbitMQ, startConsumer }