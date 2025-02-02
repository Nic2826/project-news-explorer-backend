const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: password,
    required: true,
    select: false
  },
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength:30,
    default: "Nic"
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
