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
}

// Function to retrieve all courses
async function getCourses() {
  try {
    const courses = await Course.find().populate({
      path: "facultyMember.faculty",
      select: "firstName lastName position",
    });
    return courses;
  } catch (error) {
    throw error;
  }
}

// Function to update course details
async function updateCourse(courseId, updatedCourseData) {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: updatedCourseData },
      { new: true }
    );

    return updatedCourse;
  } catch (error) {
    throw error;
  }
}

// Function to delete a course
async function deleteCourse(courseId) {
  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    return deletedCourse;
  } catch (error) {
    throw error;
  }
}

// Function to retrieve details of a specific course by ID
async function getCourseById(courseId) {
  try {
    const course = await Course.findById(courseId).populate({
      path: "facultyMember.faculty",
      select: "firstName lastName position",
    });

    // For students, check if the student is enrolled in the course
    // const enrollment = await StudentEnrollment.findOne({
    // studentId: userId,
    //   courseId: courseId,
    // });
    // if (!enrollment) {
    //   throw new Error("You are not enrolled in this course.");
    // }

    return course;
  } catch (error) {
    throw error;
  }
}

// Function to assign a faculty members to a course
async function assignFaculty(courseId, facultyId, position) {
  try {

    const assignFaculty = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { facultyMember: { faculty: facultyId, position } } },
      { new: true }
    );
    return assignFaculty;
  } catch (error) {
    throw error;
  }
}

// Function to remove a faculty member from a course
async function removeFaculty(courseId, facultyId) {
  try {

    const removeFaculty = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { facultyMember: { faculty: facultyId } } },
      { new: true }
    );
    return removeFaculty;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  assignFaculty,
  removeFaculty,
  getCourseById,
};
