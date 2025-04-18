const amqp = require('amqplib');
const {initConsumer} = require('./consumer');
const io = require('socket.io'); // Ensure Socket.IO is initialized


let channel = null;
const exchange = 'message';

async function initProducer(socketId, room) {
    try {
        const connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        const queue = `queue_${socketId}`;
        
        await channel.assertExchange(exchange, 'topic', { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, room);

        await initConsumer(socketId, room);
        
        console.log('PRODUCER initialized for socket:', socketId, 'in room:', room);
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
        channel.publish(exchange, room, Buffer.from(JSON.stringify({
            message,
            sender: socketId,
            room: room
        })), { persistent: true });
        console.log("SENT to room", room, ":", message);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

async function sendMessage(room, message, socketId) {
    try {
        if (!channel) {
            await initConsumer(socketId, room);
        }
        const messageContent = {
            message,
            sender: socketId,
            room: room
        };
        channel.publish(exchange, room, Buffer.from(JSON.stringify(messageContent)), { persistent: true });
        console.log("SENT to room", room, ":", message);

        // Emit the message to the room using Socket.IO
        io.to(room).emit('receiveMessage', messageContent);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

module.exports = { initProducer, sendMessage };