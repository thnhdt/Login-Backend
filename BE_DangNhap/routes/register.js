const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./model/user');

const dotenv = require('dotenv');

dotenv.config();
const uri = process.env.URI;
mongoose.connect(uri);

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



// Connect to MongoDB


// Insert books into the database
const books = [
  { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
  { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { title: "1984", author: "George Orwell", year: 1949 },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
  { title: "Pride and Prejudice", author: "Jane Austen", year: 1813 }
];

// Insert multiple documents (books) into the collection
Book.insertMany(books)
  .then(() => {
    console.log('Books inserted successfully');
    mongoose.connection.close(); // Close the connection after insertion
  })
  .catch((err) => {
    console.error('Error inserting books:', err);
    mongoose.connection.close(); // Close the connection on error
  });
  