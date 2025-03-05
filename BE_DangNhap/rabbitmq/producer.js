const amqp = require('amqplib');

let channel = null;
const exchange = 'message';

async function initProducer() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        const queue = 'task_queue';
        
        await channel.assertExchange(exchange, 'direct', { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, 'goto');

        console.log('PRODUCER initialized');
    } catch (error) {
        console.error('Producer initialization error:', error);
    }
}

async function sendMessage(message) {
    try {
        if (!channel) {
            await initProducer();
        }
        const routingKey = 'goto';
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), { persistent: true });
        console.log("SENT:", message);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

module.exports = { initProducer, sendMessage };