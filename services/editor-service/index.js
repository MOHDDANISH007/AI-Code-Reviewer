const express = require('express')
const cors = require('cors')
// Remove session and cookie-parser for API service
// const session = require('express-session')
// const cookieParser = require('cookie-parser')

require('dotenv').config()

const connectDB = require('./DB/db.js')
const codeEditorRoutes = require('./routes/code_editor.routes.js')
const { startConsumer } = require('./rabbitmq/consumer.js')

// Connect to MongoDB
connectDB()

PORT = process.env.PORT || 3002
const app = express()

// Middleware - Simplified for API service
app.use(cors())
app.use(express.json())
// Remove session and cookie parser - not needed for stateless API

// Routes
app.use('/editor', codeEditorRoutes)

// Start RabbitMQ Consumer
startConsumer().then(() => {
  console.log('🚀 RabbitMQ Consumer Started');
});

app.get("/health", (req, res) => {
  res.send("Healthy")
})

app.listen(PORT, () => {
  console.log(`🚀 Editor Service running on port ${PORT}`)
})