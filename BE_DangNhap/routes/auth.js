const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();
const uri = process.env.URI;
const client = new MongoClient(uri);

const Login = async (req, res) => {
    const { username, password } = req.body;

    try {
      await client.connect();
      const database = client.db('login');
      const usersCollection = database.collection('users');
      const user = await usersCollection.findOne({ username });
      const hashPassword = await bcrypt.compare(password, user.password)
      if (user && user.username === username && hashPassword) {
        return res.status(200).json({ message: "Login thành công" });
      } else{
        return res.status(401).json({ message: "Login thất bại" });
      }
    
    } catch (error) {
        console.error('Error', error);
        res.json({ message: "Error" });
    } finally {
        await client.close();
    }
}

router.post('/', Login);
router.get('/', (req, res) => {
      res.send("Testing");
    });

module.exports = router;