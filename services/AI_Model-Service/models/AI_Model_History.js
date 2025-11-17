const mongoose = require('mongoose');


const chatHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [
    {
      sender: { type: String, enum: ["user", "AI"], required: true },
      content: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  associated_repo: {
    repo_name: String,
    repo_url: String
  }
}, { timestamps: true });

module.exports = mongoose.model("ChatHistory", chatHistorySchema);