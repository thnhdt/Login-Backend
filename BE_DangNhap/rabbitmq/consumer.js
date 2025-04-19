const amqp = require('amqplib');
let ioInstance = null;

function setIO(io) {
    ioInstance = io;
}

async function initConsumer(socketId, room) {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        
        await channel.assertExchange('message', 'topic', { durable: true });
        const queue = `queue_${socketId}_${room}`;
        
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, 'message', room);
        console.log("1");
        
        channel.consume(queue, (msg) => {
            if (msg) {
                try {
                    const content = JSON.parse(msg.content.toString());
                    if (ioInstance) {
                        ioInstance.to(room).emit('receiveMessage', content);
                    } else {
                        console.error('Socket.IO instance is not initialized');
                    }
                    console.log(`[${room}] Received:`, content);
                    channel.ack(msg);
                } catch (err) {
                    console.error('Message parse error:', err);
                    channel.nack(msg);
                }
            }
        }, { noAck: false });
        
        return true;
    } catch (err) {
        console.error('Consumer error:', err);
        throw err;
    }
}

module.exports = { initConsumer, setIO };