const mongoose = require('mongoose');
const user = new mongoose.Schema({
  title: String,
  author: String,
  year: Number
});

const User = mongoose.model('User', user);
module.exports = User;


  