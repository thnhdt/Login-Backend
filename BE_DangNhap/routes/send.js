const express = require('express');
const router = express.Router();
const { initProducer, sendMessage } = require('../rabbitmq/producer');
const db = require('../models');
const Message = db.Message;

let init = false;

const initializeProducer = async () => {
  if (!init) {
    await initProducer();
    init = true;
  }
};

const Send = async (req, res) => {
  try {
    const { sender, room, message } = req.body;
    
    if (!sender || !room || !message) {
      return res.status(400).json({ message: 'All field are required' });
    }
    // luu o consumer
    // await Message.create({ sender, room, message });
    await initializeProducer();
    await sendMessage(room, {
      sender: sender,
      room: room,
      message: message
    });
    console.log(sender, room, message)
    
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
};

router.post('/', Send);

module.exports = router;