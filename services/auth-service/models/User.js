const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: 'oauth' }, // dummy for OAuth
  oauth_token: String,
  avatar_url: String, // ✅ new field
  repos: [String], // ✅ new field
  role: { type: String, enum: ['host', 'participant'], default: 'participant' },
  joinedContest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contest',
    default: null
  }
})

module.exports = mongoose.model('User', userSchema)
