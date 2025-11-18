const Groq = require("groq-sdk");

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function enhancePreviousAIResponse(userName, userMessage, previousResponse) {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. Improve and enhance the previous AI response. 
           Make it clearer, more detailed, well-structured, and natural. 
           Focus on coding, programming, AI, Machine Learning, and Development topics.
           If the user asks nonsense questions, respond with "I don't understand".
           Do NOT rhyme. Do NOT invent facts.
           
           USER NAME: ${userName}`
        },
        {
          role: "user",
          content: `User's question: ${userMessage}
Previous AI response: ${previousResponse}

Please enhance, rewrite, and clarify the previous response.`
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.5,
      max_tokens: 1024,
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error('❌ Groq AI enhancement failed:', error.message);
    throw error;
  }
}

module.exports = { enhancePreviousAIResponse };