const { Cerebras } = require('@cerebras/cerebras_cloud_sdk');

const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY
});

async function Cerebras_AI_Service(userName, message) {
  try {
    const stream = await cerebras.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful coding assistant specialized in programming, AI, Machine Learning, and Development.
          Greet the user with a nice message (user's name: ${userName}), but only once when the user first arrives.
          Focus on technical topics. If the user asks nonsense or off-topic questions, respond with "I don't understand".`
        },
        {
          role: "user",
          content: message
        }
      ],
      model: 'zai-glm-4.6',
      stream: true,
      max_completion_tokens: 8192,
      temperature: 0.6,
      top_p: 0.95
    });

    let fullResponse = '';
    console.log('🤖 Cerebras AI Response:');
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      process.stdout.write(content);
      fullResponse += content;
    }
    
    console.log('\n✅ Cerebras AI Response completed');
    return fullResponse;
    
  } catch (error) {
    console.error('❌ Cerebras AI Processing failed:', error.message);
    throw error;
  }
}

module.exports = { Cerebras_AI_Service };