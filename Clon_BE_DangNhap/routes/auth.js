const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
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
  secret: '123'
}))

const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ username });
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
// module.exports = { requireAuth };


//   /api->local
//redis session save
//redis luon`
//config
// goi. app.database.redis ....
//cookie n session
//stm?

//axios
