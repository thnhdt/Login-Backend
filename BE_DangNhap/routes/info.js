const express = require('express');
const router = express.Router();
const User = require('../model/user');
const { requireAuth } = require('./auth');

const Info = async (req, res) => {
  const userInfo = new User(req.session.user);
  try {
    await userInfo.save();
    res.status(201).json({ message: 'User info saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user info', error });
  }
}

router.post('/', Info);
router.get('/', requireAuth, (req, res) => {
  res.json({ user: req.session.user });
});

module.exports = router;