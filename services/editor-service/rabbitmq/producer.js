const amqp = require('amqplib');

let channel = null;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://rabbitmq:5672');
    channel = await connection.createChannel();
    
    // Create EXCHANGE (not direct queue)
    await channel.assertExchange('code_execution_exchange', 'direct', {
      durable: true
    });
    
    console.log('✅ Connected to RabbitMQ with Exchange');
    return channel;
  } catch (error) {
    console.error('❌ RabbitMQ connection failed:', error);
    throw error;
  }
}

async function sendToQueue(code, language, userId, userName) {
  try {
    if (!channel) {
      await connectRabbitMQ();
    }


    const message = {
      code: code,
      language: language,
      userId: userId,
      userName: userName,
      timestamp: new Date()
    };

    // Create routing key based on language
    const routingKey = `${language}.code`;
    
    // Send to exchange with routing key
    channel.publish(
      'code_execution_exchange', // Exchange name
      routingKey,                // Routing key (python.code, javascript.code, etc.)
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );

    console.log(`📨 Code sent to ${routingKey} for user:`, userId);
    
  } catch (error) {
    console.error('❌ Failed to send to queue:', error);
    throw error;
  }
}

module.exports = { sendToQueue };