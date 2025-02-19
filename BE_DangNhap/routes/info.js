const express = require('express');
const router = express.Router();
const User = require('../model/user');

const Info = async (req, res) => {
  if(req.session.user){
    const username = req.session.user.username;
    const user = await User.findOne({username});
    res.send({user});
  }
  else{
    res.status(400).json({message: 'Not loged in'});
  }
}

router.get('/', Info);
router.post('/', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  const { name, address, phone_num, email } = req.body;
  try { 
    const username = req.session.user.username;
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (name) user.name = name;
    if (address) user.address = address;
    if (phone_num) user.phone_num = phone_num;
    if (email) user.email = email;
    await user.save();
    res.json({ message: 'User information updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user information', error });
  }
});

module.exports = router;