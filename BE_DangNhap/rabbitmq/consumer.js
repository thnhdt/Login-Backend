const amqp = require('amqplib');

let channel = null;
const exchange = 'message';

async function initConsumer(socketId, room) {
    try {
        const connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        const queue = `queue_${socketId}`;

        await channel.assertExchange(exchange, 'topic', { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, room);

        console.log("CONSUMER initialized for socket:", socketId, "in room:", room);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                try {
                    const messageContent = JSON.parse(msg.content.toString());
                    console.log("RECEIVED in room", messageContent.room, ":", messageContent);
                    
                    if (messageContent.room === room) {
                        if (messageContent.sender !== socketId) {
                            console.log(`Message from ${messageContent.sender} in room ${room}:`, messageContent.message);
                        }
                    }
                    
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