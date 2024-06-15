const Course = require("../model/course.model");
const User = require("../model/user.model");

// Function to create a new course
async function createCourse(courseData) {
  try {
    const course = await Course.create(courseData);
    return course;
  } catch (error) {
    throw new error();
  }
};

// Function to retrieve all courses
async function getCourses() {
    try {
      const courses = await Course.find().populate({
        path: "faculties.faculty",
        select: "firstName lastName position",
      });
      return courses;
    } catch (error) {
      throw error;
    }
  }

module.exports = { createCourse,getCourses };
