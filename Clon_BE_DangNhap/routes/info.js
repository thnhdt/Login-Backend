const express = require('express');
const router = express.Router();
const { createClient } = require('redis');
const client = createClient({

}); 

client.connect().catch(console.error);

const Info = async (req, res) => {
  if(req.session.user){
    res.send({user: req.session.user});
  }
  else{
    res.status(400).json({message: 'Not loged in'});
  }
}

router.get('/', Info);
router.post('/', (req, res) => {
  if (!req.session || !req.session.sessionId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  res.json({ sessionId: req.session.sessionId });
});

module.exports = router;