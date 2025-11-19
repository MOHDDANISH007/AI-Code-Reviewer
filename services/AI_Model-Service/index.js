const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const expressSession = require('express-session')
const dotenv = require('dotenv')
const path = require('path')

const connectDB = require('./DB/db.js')
const AI_Model_Routes = require('./routes/AI_Model.routes.js')
const { startConsumer } = require('./rabbitMQ/consumer.js')

dotenv.config()

// connectToDB
connectDB()

// // Start consumers
// startConsumer()

const app = express()
const PORT = process.env.PORT || 3003

// All middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Express session middleware
app.use(
  expressSession({
    name: 'ai_model_service_sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax'
    }
  })
)

// Routes Middleware
app.use('/api/ai', AI_Model_Routes)

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'AI Model Service is running',
    timestamp: new Date().toISOString()
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err)
  res.status(500).json({ error: err.message })
})

// Start server and then consumers
app.listen(PORT, async () => {
  console.log(`✅ AI Model service running on port ${PORT}`)
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)

  try {
    await startConsumer()
    console.log('✅ RabbitMQ Consumer started')
  } catch (error) {
    console.error('❌ Failed to start consumers:', error)
  }
})
