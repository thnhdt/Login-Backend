const express = require('express');
const cors = require('cors');
const auth = require('./routes/auth');
const register = require('./routes/register');
const dotenv = require('dotenv');
const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();
const uri = process.env.URI;
const PORT = process.env.PORT || 3001;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


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
