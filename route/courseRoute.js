const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  assignFaculty,
  removeFaculty,
  updateCourse,
  deleteCourse,
  getCourseById,
} = require("../controller/courseController");

// course routes
router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:courseId", getCourseById);
router.delete("/:courseId", deleteCourse);
router.put("/:courseId", updateCourse);
router.post("/assign-faculty/:courseId", assignFaculty);
router.put("/:courseId/:facultyId",  removeFaculty);

module.exports = router;
