const mongoose = require('mongoose')

const aiReviewSchema = new mongoose.Schema(
  {
    snippet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CodeSnippet',
      required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quick_tips: [String], // array of tips
    full_analysis: String
  },
  { timestamps: true }
)

module.exports = mongoose.model('AIReview', aiReviewSchema)
