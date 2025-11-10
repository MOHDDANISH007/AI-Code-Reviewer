const express = require('express')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const connectDB = require('./DB/db.js')
const authRoutes = require('./routes/auth.js')
const { authenticateToken } = require('./middleware/auth.js')

require('./oAuth_Service/github_service.js')

// Connect to MongoDB
connectDB()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

app.use(cookieParser())

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // use true only if running HTTPS
      httpOnly: true, // helps prevent XSS attacks
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  })
)

// Initialize passport
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/api/auth', authRoutes)

// Protected route example
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Protected route accessed successfully',
    user: req.user
  })
})

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'Auth service is running',
    timestamp: new Date().toISOString()
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`✅ Auth service running on port ${PORT}`)
})
