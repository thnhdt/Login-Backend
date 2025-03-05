const express = require('express');
const router = express.Router();
const { initProducer, sendMessage } = require('../rabbitmq/producer');

let init = false;

const initializeProducer = async () => {
  if (!init) {
    await initProducer();
    init = true;
  }
};

const Send = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    
    if (!sender || !receiver || !message) {
      return res.status(400).json({ message: 'All field are required' });
    }

    await initializeProducer();
    await sendMessage({
      sender: sender,
      receiver: receiver,
      message: message
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
};

router.post('/', Send);

module.exports = router;