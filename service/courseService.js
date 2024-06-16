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
    const faculty = await User.findById(facultyId);
    if (faculty && faculty.role !== 1) {
      throw new Error("Only Faculty member can be assigned to courses");
    }

    const course = await Course.findOne({
      _id: courseId,
      "faculties.faculty": facultyId,
    });
    if (course) {
      throw new Error("Faculty member is already assigned to this course");
    }

    await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { faculties: { faculty: facultyId, position } } },
      { new: true }
    );
    return { message: "Faculty member is assigned successfully" };
  } catch (error) {
    throw error;
  }
}

// Function to remove a faculty member from a course
async function removeFaculty(courseId, facultyId) {
  try {
    // Check if the faculty member exists in the course
    const course = await Course.findOne({
      _id: courseId,
      "faculties.faculty": facultyId,
    });
    if (!course) {
      throw new Error("Faculty member not found in the course");
    }

    await Course.findByIdAndUpdate(
      courseId,
      { $pull: { faculties: { faculty: facultyId } } },
      { new: true }
    );
    return { message: "Faculty member is removed successfully" };
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
