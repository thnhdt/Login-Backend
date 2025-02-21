const express = require('express');
const cors = require('cors');
const session = require('express-session');

const { createServer } = require("http");
const { Server } = require("socket.io");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const Rclient = createClient();
const subClient = Rclient.duplicate();
Rclient.on('error', err => console.log('Redis Client Error', err));

const auth = require('./routes/auth');
const register = require('./routes/register');
const info = require('./routes/info');
// const send = require('./routes/send');

const dotenv = require('dotenv');
const connectDB = require('./model/db');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5001",
        methods: ["GET", "POST"],
        credentials: true
    }
});

Promise.all([Rclient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(Rclient, subClient));

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);
        socket.on("message", (msg) => {
            console.log(`Received: ${msg}`);
            io.emit("message", msg);
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
});

dotenv.config();
const PORT = process.env.PORT || 3001;

connectDB();

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
// app.use('/api/send', send);

app.get('/', (req, res) => {
    res.send("ReactJS + ExpressJS + MongoDB");
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});