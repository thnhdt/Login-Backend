const express = require('express');
const cors = require('cors');
const session = require('express-session');
// const redis = require('redis');
// const connectRedis = require('connect-redis');

const auth = require('./routes/auth');
const register = require('./routes/register');
// const info = require('./routes/info');

const dotenv = require('dotenv');
const connectDB = require('./model/db');

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;

// Tạo Redis client
// const RedisStore = connectRedis(session);
// const redisClient = redis.createClient({
//     host: 'localhost',
//     port: 6379,
// });

// redisClient.on('error', function (err) {
//     console.error('Could not connect to Redis:', err);
// });

// redisClient.on('connect', function () {
//     console.log('Connected to Redis');
// });

connectDB();
app.use(express.json());

// Cấu hình session với Redis store
// app.use(session({
//     store: new RedisStore({ client: redisClient }),
//     secret: process.env.KEY || 'your-secret-key', // Sử dụng biến môi trường hoặc một chuỗi bí mật
//     resave: false,
//     saveUninitialized: false,
//     cookie: { 
//         secure: false,
//         httpOnly: true, 
//         maxAge: 60000 // Thời gian sống của cookie (1 phút)
//     }
// }));

app.use(cors());
app.use(express.json());

app.use('/login', auth);
app.use('/register', register);
// app.use('/info', info);

app.get('/', (req, res) => {
    res.send("ReactJS + ExpressJS + MongoDB");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});