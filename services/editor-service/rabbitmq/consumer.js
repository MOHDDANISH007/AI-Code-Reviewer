const amqp = require('amqplib')
const axios = require('axios')
const CodeSnippet = require('../models/code_editor.js')
const dotenv = require('dotenv')

dotenv.config()

let channel = null

async function connectRabbitMQ () {
  try {
    const connection = await amqp.connect('amqp://rabbitmq:5672')
    channel = await connection.createChannel()

    // Create the same exchange as producer
    await channel.assertExchange('code_execution_exchange', 'direct', {
      durable: true
    })

    // Create queues for each language
    const languages = ['python', 'javascript', 'java', 'cpp', 'c']

    for (const language of languages) {
      const queueName = `${language}_execution_queue`
      const routingKey = `${language}.code`

      // Create queue
      await channel.assertQueue(queueName, { durable: true })

      // Bind queue to exchange with routing key
      await channel.bindQueue(queueName, 'code_execution_exchange', routingKey)

      console.log(`✅ Queue ${queueName} bound to ${routingKey}`)
    }

    console.log('✅ Consumer connected to RabbitMQ')
    return channel
  } catch (error) {
    console.error('❌ Consumer connection failed:', error)
    throw error
  }
}

// Execute code using Judge0
async function executeWithJudge0 (code, language) {
  try {
    const languageId = getLanguageId(language)

    const response = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions',
      {
        source_code: code,
        language_id: languageId,
        stdin: '',
        expected_output: null
      },
      {
        headers: {
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    )

    const submissionId = response.data.token

    // Wait for result
    let result
    let attempts = 0

    while (attempts < 10) {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const statusResponse = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}`,
        {
          headers: {
            'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        }
      )

      result = statusResponse.data

      if (result.status.id !== 1 && result.status.id !== 2) {
        // Not in queue or processing
        break
      }

      attempts++
    }

    console.log("Result of the code : ", result)

    return result
  } catch (error) {
    console.error('❌ Judge0 execution failed:', error)
    throw error
  }
}

function getLanguageId (language) {
  const languages = {
    python: 71,
    javascript: 63,
    java: 62,
    cpp: 54,
    c: 50
  }
  return languages[language] || 71
}

// Start consuming messages
async function startConsumer () {
  try {
    if (!channel) {
      await connectRabbitMQ()
    }

    const languages = ['python', 'javascript', 'java', 'cpp', 'c']

    for (const language of languages) {
      const queueName = `${language}_execution_queue`

      console.log(`🔄 Waiting for messages in ${queueName}...`)

      channel.consume(queueName, async msg => {
        if (msg !== null) {
          try {
            const message = JSON.parse(msg.content.toString())
            console.log(
              `📨 Received ${language} code from user:`,
              message.userId
            )

            // Execute the code
            const result = await executeWithJudge0(
              message.code,
              message.language
            )

            // 🛠️ FIXED: Save execution result to database (NEW CODE)
            console.log('🔄 Attempting to save to database...');

            try {
              const newSnippet = new CodeSnippet({
                user: message.userId,
                code: message.code,
                language: message.language,
                last_execution_result: {
                  output: result.stdout,
                  error: result.stderr,
                  execution_time: result.time,
                  status: result.status.description.toLowerCase()
                }
              });

              const savedSnippet = await newSnippet.save();
              console.log('✅ DATABASE SAVE SUCCESS! Document ID:', savedSnippet._id);
              console.log('✅ User:', savedSnippet.user);
              console.log('✅ Language:', savedSnippet.language);
              console.log('✅ Status:', savedSnippet.last_execution_result.status);
              
            } catch (error) {
              console.log('❌ DATABASE SAVE ERROR:', error.message);
            }

            console.log(`✅ ${language} code executed for user:`, message.userId)

            // Acknowledge message
            channel.ack(msg)
          } catch (error) {
            console.error(`❌ Error processing ${language} message:`, error)
            // Don't acknowledge - let another worker try
            channel.nack(msg)
          }
        }
      })
    }
  } catch (error) {
    console.error('❌ Consumer error:', error)
  }
}

module.exports = { startConsumer }