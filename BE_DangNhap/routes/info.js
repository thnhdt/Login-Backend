const express = require('express');
const router = express.Router();
const { createClient } = require('redis');
const client = createClient(); 

client.connect().catch(console.error);

const Info = async (req, res) => {
  const sessionId = req.cookies.sessionId;
  
  if (!sessionId) {
    return res.status(401).json({ message: 'Invalid session ID' });
  }
  client.get(`session:${sessionId}`, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving session data' });
    }
    if (!data) {
      return res.status(401).json({ message: 'Invalid session ID' });
    }
    res.json({ message: 'Welcome back, ' + JSON.parse(data).username });
  });
}

router.get('/', Info);
router.post('/', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  res.json({ user: req.session.user });
});

module.exports = router;