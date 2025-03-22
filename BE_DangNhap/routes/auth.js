const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.User;
const { createClient } = require('redis');
const client = createClient();

client.connect().catch(console.error);
const {RedisStore} = require('connect-redis');

const redisStore = new RedisStore({
  client,
  prefix: 'login-app:'
});

const session = require('express-session');

router.use(session({
  store: redisStore,
  secret: '123',
  resave: false,
  saveUninitialized: true
}))

const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({
        where: {
          username: username,
        },
      });
      if (!user) {
          return res.status(401).json({ message: "Login thất bại" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
          // const sessionId = crypto.randomBytes(16).toString('hex');
          req.session.user = user;
          req.session.save();
          // await client.set(`session:${sessionId}`, JSON.stringify({ username }), 'EX', 3600);
          // req.session.sessionId = sessionId;
          return res.status(200).json({ message: "Login thành công" });
      } else {
          return res.status(401).json({ message: "Login thất bại" });
      }
  } catch (error) {
      console.error('Error', error);
      res.status(500).json({ message: "Error" });
  }
}

router.post('/', Login);
router.get('/', (req, res) => {
      res.send("Testing");
    });

module.exports = router;