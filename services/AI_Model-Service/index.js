const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const expressSession = require('express-session')
const dotenv = require('dotenv')

const connectDB = require('./DB/db.js')
const AI_Model_Routes = require('./routes/AI_Model.routes.js')


dotenv.config()


// connectToDB
connectDB()

const app = express()
const PORT = process.env.PORT || 3003

// All middleware


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Express session middleware - CORRECTED
app.use(expressSession({
    name: 'ai_model_service_sid', // Custom cookie name
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


// Routes Middleware

app.use('/AI_Model', AI_Model_Routes)



// Health check route (useful for deployment)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'AI Model Service is running',
        timestamp: new Date().toISOString()
    })
})

app.listen(PORT, () => {
    console.log(`✅ AI Model service running on port ${PORT}`)
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
})