const amqp = require('amqplib');

let channel = null;


async function initProducer() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        await channel.assertExchange('message', 'topic', { durable: true });
        return channel;
    } catch (error) {
        console.error('Producer initialization error:', error);
    }
}

async function sendMessage(room, message, socketId) {
    try {
        const channel = await initProducer();
        channel.publish('message', room, Buffer.from(JSON.stringify(message)), { persistent: true });
        
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

module.exports = { initProducer, sendMessage};
