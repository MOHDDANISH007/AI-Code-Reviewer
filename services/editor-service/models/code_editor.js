const mongoose = require('mongoose');


const codeSnippetSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  // user:{
  //   type: String,
  //   required: true
  // },
  title: {
    type: String,
    default: "Untitled Snippet"
  },
  language: {
    type: String,
    required: true,
    enum: ["python", "javascript", "java", "cpp", "c"] // Restrict languages
  },
  code: {
    type: String,
    required: true
  },
  description: String, // What this code does
  isPublic: {
    type: Boolean,
    default: false
  },
  // For GitHub integration (optional)
  repo_name: String,
  repo_url: String,
  commit_hash: String,
  
  // For execution results
  last_execution_result: {
    output: String,
    error: String,
    execution_time: Number,
    status: String // "success", "error", "timeout"
  }
}, { 
  timestamps: true 
});


module.exports = mongoose.model('CodeSnippet', codeSnippetSchema);