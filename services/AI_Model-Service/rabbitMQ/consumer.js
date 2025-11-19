const amqplib = require('amqplib')
const { Cerebras_AI_Service } = require('../AI_Service/Cerebreas_AI.service.js')
const { enhancePreviousAIResponse } = require('../AI_Service/Groq_AI.Service.js')
const ChatHistory = require('../models/AI_Model_History.js')

let channel = null

async function connectRabbitMQ() {
  try {
    const connection = await amqplib.connect('amqp://rabbitmq:5672')
    channel = await connection.createChannel()

    // CREATE QUEUE
    await channel.assertQueue('AI_Model_Queue', { durable: true })

    // CREATE SAME EXCHANGE USED BY PRODUCER
    await channel.assertExchange('AI_Model_Exchange', 'direct', { durable: true })

    // BIND QUEUE TO EXCHANGE WITH SAME ROUTING KEY
    await channel.bindQueue(
      'AI_Model_Queue',
      'AI_Model_Exchange',
      'AI_Model_Routing_Key'
    )

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

          // STEP 1: INITIAL RESPONSE
          console.log('🔄 Getting initial response from Cerebras AI...')
          const initialResponse = await Cerebras_AI_Service(
            message.userName,
            message.message
          )
          console.log('✅ Cerebras AI Response completed')

          // STEP 2: ENHANCEMENT
          console.log('🔄 Enhancing response with Groq AI...')
          const enhancedResponse = await enhancePreviousAIResponse(
            message.userName,
            message.message,
            initialResponse
          )
          console.log('🎯 Enhanced Final Response:', enhancedResponse)

          // ACK MESSAGE
          channel.ack(msg)
          console.log('✅ Message acknowledged')

          // SAVE TO DB
          await ChatHistory.findOneAndUpdate(
            { user: message.userId },
            {
              $push: {
                messages: [
                  {
                    sender: "user",
                    content: message.message
                  },
                  {
                    sender: "AI",
                    content: enhancedResponse
                  }
                ]
              }
            },
            { upsert: true, new: true }
          )

        } catch (error) {
          console.error('❌ Failed to process AI_Model message:', error)
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
