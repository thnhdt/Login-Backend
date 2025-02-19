const express = require('express');
const cors = require('cors');
const session = require('express-session');

const { createClient } = require('redis');
const Rclient = createClient();
Rclient.on('error', err => console.log('Redis Client Error', err));
Rclient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.log('Failed to connect to Redis', err));

const auth = require('./routes/auth');
const register = require('./routes/register');
const info = require('./routes/info');

const dotenv = require('dotenv');
const connectDB = require('./model/db');

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
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

app.get('/', (req, res) => {
    res.send("ReactJS + ExpressJS + MongoDB");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});