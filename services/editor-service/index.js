const express = require('express')
const cors = require('cors')
// Remove session and cookie-parser for API service
const session = require('express-session')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

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
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use(expressSession({
    name: 'editor_service_sid', // Custom cookie name
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true, // Changed to true for development
    cookie: {
        secure: false, // Set to false for development (HTTP)
        httpOnly: true, // Prevents client-side JS access
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        sameSite: 'lax' // Helps with CSRF protection
    }
}))





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