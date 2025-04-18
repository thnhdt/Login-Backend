// const amqp = require('amqplib');

// let channel = null;
// const exchange = 'topic_logs';

// async function initConsumer() {
//     try {
//         const connection = await amqp.connect('amqp://localhost');
//         channel = await connection.createChannel();
//         const queue = 'task_queue';

//         await channel.assertExchange(exchange, 'topic', { durable: true }); // Tạo exchange
//         await channel.assertQueue(queue, { durable: true });
//         await channel.bindQueue(queue, exchange, '#'); // Liên kết queue với exchange

//         console.log("🚀 Consumer initialized");

//         channel.consume(queue, (msg) => {
//             if (msg !== null) {
//                 const messageContent = JSON.parse(msg.content.toString());
//                 console.log("✅ Received:", messageContent);
//                 channel.ack(msg);
//             }
//         }, { noAck: false });
//     } catch (error) {
//         console.error('Consumer initialization error:', error);
//     }
// }

// initConsumer()

const io = require("socket.io");

// Server-side setup
const server = require('http').createServer();
const socketServer = io(server);

socketServer.on("connection", (socket) => {
    console.log("client connected");
  
    socket.on("ping", (count) => {
      console.log(count);
    });
});

server.listen(3000, () => {
  console.log('Socket.IO server listening on port 3000');
});

// If you need client-side code, it should be in a separate file
// or use socket.io-client package specifically:
/*
const ioClient = require("socket.io-client");
const socket = ioClient("http://localhost:3000");

let count = 0;
setInterval(() => {
  socket.volatile.emit("ping", ++count);
}, 1000);
*/