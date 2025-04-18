const express = require('express');
const cors = require('cors');
const session = require('express-session');
// Initial

//socket io-http server + redis
const { createServer } = require("http");
const { Server } = require("socket.io");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

{
// // Khởi tạo RabbitMQ connections
// async function initializeRabbitMQ() {
//     await initProducer();
//     await initConsumer();
// }

// initializeRabbitMQ();

// setInterval(() => {
//     const message = { 
//         orderId: Math.floor(Math.random() * 1000), 
//         product: "Laptop", 
//         quantity: 2 
//     };
//     sendMessage(message);
// }, 5000);
}
const redisClient = createClient({
  // url: 'redis://redis:6379'  // Sử dụng tên service làm hostname khi dùng docker
});
const subClient = redisClient.duplicate();
redisClient.on('error', err => console.log('Redis Client Error', err));

const auth = require('./routes/auth');
const register = require('./routes/register');
const info = require('./routes/info');
const send = require('./routes/send');
const receive = require('./routes/receive');
const dotenv = require('dotenv');
// const connectDB = require('./model/db');
dotenv.config();
const PORT = process.env.PORT || 3001;
const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize(process.env.POSTGRES_URI);
const sequelize = new Sequelize("postgres", "postgres", "thnhdt", {
  // host: "localhost",
  host: "db.disswnqpbzsaxxybflxo.supabase.co",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

(async () => {
  try {
      await sequelize.authenticate();
      console.log("Kết nối thành công Sequelize!");
  } catch (error) {
      console.error("Lỗi kết nối Sequelize:", error);
  }
})();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5001",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const connectRedis = async () => {
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      await redisClient.connect();
      console.log('Connected to Redis successfully');
      return;
    } catch (error) {
      console.log(`Failed to connect to Redis (attempt ${i + 1}/${maxRetries})`);
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

Promise.all([connectRedis().catch(console.error), subClient.connect()]).then(() => {
    io.adapter(createAdapter(redisClient, subClient));

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);
        socket.on("Rmessage", (msg) => {
            console.log(`R-Received: ${msg}`);
            io.emit("Rmessage", msg);
        });

        socket.on('joinRoom', (roomName) => {
          socket.join(roomName);  // Client tham gia phòng với tên 'roomName'
          console.log(`Socket ${socket.id} joined room: ${roomName}`);

          socket.on('sendMessage', (message) => {
            console.log(`Sending message to room ${roomName}: ${message}`);
            io.to(roomName).emit('message', `Client ${socket.id} has joined the room`);
          });
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
});

app.use(cors({
    origin: 'http://localhost:5001',
    credentials: true
}));

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
}));

app.use(express.json());

app.use('/api/login', auth);
app.use('/api/register', register);
app.use('/api/info', info);
app.use('/api/send', send);
app.use('/api/receive', receive);

app.get('/', (req, res) => {
    res.send("ReactJS + ExpressJS + MongoDB");
});

httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
