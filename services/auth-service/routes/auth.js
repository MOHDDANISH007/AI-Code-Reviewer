const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const router = express.Router()
const passport = require('passport')
const dotenv = require('dotenv')
dotenv.config()


const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

// ✅ Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })

    if (existingUser) {
      return res.status(400).json({
        error: 'User with this email or username already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      email,
      password: hashedPassword
    })

    await user.save()

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Register Error:', error)
    res.status(500).json({ error: error.message })
  }
})

// ✅ Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ error: error.message })
  }
})

// ✅ Logout
router.post('/logout', (req, res) => {
  try {
    // For JWT-based auth, we can’t “invalidate” a token on server directly.
    // But you can make the client delete it or store blacklisted tokens in DB.
    // For now, we’ll just instruct the client to remove it.
    res.json({
      message:
        'Logout successful — please delete your token on the client side.'
    })
  } catch (error) {
    console.error('Logout Error:', error)
    res.status(500).json({ error: error.message })
  }
})

//  --------------------------GitHub OAuth--------------------------

// ✅ GitHub login route
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email', 'read:user', 'repo']
  })
)

// ✅ Callback route
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const user = req.user

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      )

      // Send user details + token
      res.json({
        message: 'GitHub Login successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar_url: user.avatar_url,
          repos: user.repos
        }
      })
    } catch (err) {
      console.error('GitHub Auth Error:', err)
      res.status(500).json({ error: 'GitHub authentication failed' })
    }
  }
)

module.exports = router
