const amqp = require('amqplib');
const { initConsumer } = require('./consumer');

let channel = null;
const exchange = 'message';
let ioInstance = null;

function setIO(io) {
    ioInstance = io;
}

async function initProducer(socketId, room) {
    try {
        const connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        const queue = `queue_${socketId}`;

        await channel.assertExchange(exchange, 'topic', { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, room);

        await initConsumer(socketId, room);
        return channel;
    } catch (error) {
        console.error('Producer initialization error:', error);
    }
}

async function sendMessage(room, message, socketId) {
    try {
        if (!channel) {
            await initProducer(socketId, room);
        }
        channel.publish(exchange, room, Buffer.from(JSON.stringify(message)), { persistent: true });

        if (ioInstance) {
            ioInstance.to(room).emit('receiveMessage', message);
        } else {
            console.error('Socket.IO instance is not initialized');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

module.exports = { initProducer, sendMessage, setIO };
