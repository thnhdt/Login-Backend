const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();
const uri = process.env.URI;
const client = new MongoClient(uri);

const Register = async (req, res) => {
    const { username, password } = req.body;
    if(username === "" || password === "") return res.status(400).json({ message: "Chưa nhập đủ thông tin" });

    try {
        await client.connect();
        const database = client.db('login');
        const usersCollection = database.collection('users');

        const user = await usersCollection.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Người dùng đã tồn tại" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = { username, hashedPassword };
        await usersCollection.insertOne(newUser);

        res.status(201).json({ message: "Đăng ký thành công" });
    } catch (error) {
        console.error('Error', error);
        res.status(400).json({ message: "Error" });
    } finally {
        await client.close();
    }
}

// // Get a single post
// router.get("/:id", async (req, res) => {
//     let collection = await db.collection("posts");
//     let query = {_id: ObjectId(req.params.id)};
//     let result = await collection.findOne(query);
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
//   });
  
  
//   // Add a new document to the collection
//   router.post("/", async (req, res) => {
//     let collection = await db.collection("posts");
//     let newDocument = req.body;
//     newDocument.date = new Date();
//     let result = await collection.insertOne(newDocument);
//     res.send(result).status(204);
//   });

router.post('/', Register);
router.get('/', (req, res) => {
      res.send("Testing");
    });

module.exports = router;
  