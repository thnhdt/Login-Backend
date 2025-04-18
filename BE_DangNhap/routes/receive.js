const express = require('express');
const router = express.Router();
const { initConsumer } = require('../rabbitmq/consumer');
const db = require('../models');
const { where } = require('sequelize');
const Message = db.Message;

let init = false;

const initializeConsumer = async () => {
    if (!init) {
        await initConsumer((message) => {
            const newMessage = new Message({
                sender: message.sender,
                room: message.room,
                message: message.message
            });
            newMessage.save()
                .then(() => console.log('Message stored in database:', message))
                .catch(err => console.error('Error storing message:', err));
        });
        init = true;
    }
};

router.get('/:receiver', async (req, res) => {
    try {
        const { receiver } = req.params;
        const messages = await Message.findAll({ where: { room: receiver } });
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error receiving messages:', error);
        res.status(500).json({ message: 'Error receiving messages' });
    }
});

router.get('/:receiver/:sender', async (req, res) => {
    try {
        await initializeConsumer();
        const { sender, receiver } = req.params;
        //get from User
        const messages = await Message.findAll({
            where: {room: receiver, sender: sender},
        });          
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error receiving messages:', error);
        res.status(500).json({ message: 'Error receiving messages' });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        await Message.deleteMany({ userId });
        res.status(200).json({ message: 'Messages cleared for user' });
    } catch (error) {
        console.error('Error deleting messages:', error);
        res.status(500).json({ message: 'Error deleting messages' });
    }
});

module.exports = router;
