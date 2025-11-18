const amqplib = require('amqplib')
const { Cerebras_AI_Service } = require('../AI_Service/Cerebreas_AI.service.js')
const { enhancePreviousAIResponse } = require('../AI_Service/Groq_AI.Service.js')

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

    channel.consume('AI_Model_Queue', async msg => {
      if (msg !== null) {
        try {
          const message = JSON.parse(msg.content.toString())
          console.log('📨 Received AI_Model message:', message)

          // ✅ STEP 1: GET INITIAL RESPONSE FROM CEREBRAS AI
          console.log('🔄 Getting initial response from Cerebras AI...')
          const initialResponse = await Cerebras_AI_Service(
            message.userName,
            message.message
          )
          
          console.log('✅ Cerebras AI Response completed')
          // console.log('🤖 Initial Response:', initialResponse)

          // ✅ STEP 2: ENHANCE WITH GROQ AI FOR BETTER QUALITY
          console.log('🔄 Enhancing response with Groq AI for better accuracy...')
          const enhancedResponse = await enhancePreviousAIResponse(
            message.userName,
            message.message,
            initialResponse
          )
          
          console.log('✅ Groq AI Enhancement completed')
          console.log('🎯 Enhanced Final Response:', enhancedResponse)
          console.log('✅ AI Processing completed for user:', message.userName)

          // ✅ STEP 3: HERE YOU CAN SAVE enhancedResponse TO DATABASE
          // await saveToDatabase(message.userId, enhancedResponse);

          // ✅ ACKNOWLEDGE MESSAGE
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