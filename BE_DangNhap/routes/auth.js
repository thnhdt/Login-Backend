const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');

const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(401).json({ message: "Login thất bại" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        //   req.session.user = { username };
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