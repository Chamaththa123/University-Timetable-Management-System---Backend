const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
  },
  createdDate:{
    type: Date,
    default: Date.now()
  }
});

const User = mongoose.model("users", userschema);

module.exports = User;
