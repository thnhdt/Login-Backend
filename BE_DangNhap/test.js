const amqp = require('amqplib');

let channel = null;
const exchange = 'topic_logs';

async function initConsumer() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        const queue = 'task_queue';

        await channel.assertExchange(exchange, 'topic', { durable: true }); // Tạo exchange
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, '#'); // Liên kết queue với exchange

        console.log("🚀 Consumer initialized");

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const messageContent = JSON.parse(msg.content.toString());
                console.log("✅ Received:", messageContent);
                channel.ack(msg);
            }
        }, { noAck: false });
    } catch (error) {
        console.error('Consumer initialization error:', error);
    }
}

initConsumer()