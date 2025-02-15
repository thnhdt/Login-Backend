const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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

app.use(express.json());
app.use(cookieParser());

app.use('/login', auth);
app.use('/register', register);
app.use('/info', info);

app.get('/', (req, res) => {
    res.send("ReactJS + ExpressJS + MongoDB");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});