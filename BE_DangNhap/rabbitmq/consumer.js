const amqp = require('amqplib');
const io = require("socket.io-client");
const socket = io("http://localhost:3000", { withCredentials: true });

let channel = null;
const exchange = 'message';

async function initConsumer(messageCallback) {
    try {
        const connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        const queue = 'task_queue';

        await channel.assertExchange(exchange, 'direct', { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, 'goto');

        console.log("CONSUMER initialized");

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                try {
                    const messageContent = JSON.parse(msg.content.toString());
                    console.log("RECEIVED:", messageContent);
                    messageCallback(messageContent);
                    socket.emit('Rmessage', "Socket io: Đã nhận tin nhắn");
                    channel.ack(msg);
                } catch (error) {
                    console.error('Error processing message:', error);
                    channel.nack(msg, false, false);
                }
            }
        }, { noAck: false });

        return true;
    } catch (error) {
        console.error('Consumer initialization error:', error);
        throw error;
    }
}

module.exports = { initConsumer };