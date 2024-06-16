const mongoose = require("mongoose");

const facultyMembers = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  position: {
    type: String,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
});

const courseSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  course_code: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  facultyMember: [facultyMembers],
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const course = mongoose.model("courses", courseSchema);

module.exports = course;
