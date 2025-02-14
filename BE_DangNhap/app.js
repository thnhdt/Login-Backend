const express = require('express');
const cors = require('cors');
const auth = require('./routes/auth');
const register = require('./routes/register');
const dotenv = require('dotenv');
const connectDB = require('./model/db');

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors());
app.use(express.json())

app.use('/login', auth);
app.use('/register', register);

app.get('/', (req, res) =>{
  res.send("ReactJS + ExpressJS + MongoDB");
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
