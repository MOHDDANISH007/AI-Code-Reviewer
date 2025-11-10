const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const dotenv = require('dotenv')
const axios = require('axios')
const User = require('../models/User')

dotenv.config()

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email', 'read:user', 'repo'] // ✅ now we get repos + email
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1️⃣ Get profile pic and email
        const email =
          profile.emails && profile.emails[0]?.value
            ? profile.emails[0].value
            : `${profile.id}@github.com`

        // 2️⃣ Fetch repos using GitHub API
        const reposResponse = await axios.get(
          'https://api.github.com/user/repos',
          {
            headers: { Authorization: `token ${accessToken}` }
          }
        )
        const repoNames = reposResponse.data.map(repo => repo.name)

        // 3️⃣ Check if user exists
        let user = await User.findOne({ oauth_token: profile.id })

        if (!user) {
          user = new User({
            username: profile.displayName || profile.username,
            email,
            password: 'oauth',
            oauth_token: profile.id,
            avatar_url: profile._json.avatar_url, // ✅ store avatar
            repos: repoNames, // ✅ store repos
            role: 'participant'
          })
          await user.save()
        } else {
          // Update existing user info
          user.avatar_url = profile._json.avatar_url
          user.repos = repoNames
          await user.save()
        }

        return done(null, user)
      } catch (err) {
        console.error('GitHub Strategy Error:', err)
        return done(err)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  console.log('serializeUser:', user)
  done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    console.log('deserializeUser:', user)
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

module.exports = passport
