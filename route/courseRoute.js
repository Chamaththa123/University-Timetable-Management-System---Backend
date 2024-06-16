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
// router.post("/assign-faculty", verifyToken, AdminAccess, assignFaculty);
// router.put("/:courseId/:facultyId", verifyToken, AdminAccess, removeFaculty);
router.delete("/:courseId", deleteCourse);
router.put("/:courseId", updateCourse);
module.exports = router;
