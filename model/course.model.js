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
    type: string,
    required: true,
  },
  course_code: {
    type: string,
    required: true,
  },
  description: {
    type: string,
    required: true,
  },
  credit: {
    type: string,
    required: true,
  },
  facultyMember: [facultyMembers],
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: string,
    default: Date.now(),
  },
});

const course = mongoose.model("courses", courseSchema);

module.exports = course;
