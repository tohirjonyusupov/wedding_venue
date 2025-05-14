// const express = require("express");

// const studentRoute = express.Router();

// const createStudent = require("../controllers/admin/createStudent");
// const uploadMiddleware = require("../middlewares/uploadFile");
// const { getAllCourses } = require("../controllers/teacher/viewCourses");
// const { getStudenttask } = require("../controllers/student/viewGrade");
 
// const { checkRole } = require("../middlewares/checkRole");
// const { viewCourseStudents } = require("../controllers/student/viewCourses");
// const { joinCourse } = require("../controllers/student/joinCourse");
// const { getCourseMaterials } = require("../controllers/student/getallMaterial");
// const submitWork = require("../controllers/student/submitWork");
// const { getAllTasks } = require("../controllers/student/getallTasks");

// studentRoute.use(checkRole(["student"]));

// studentRoute.post("/", createStudent);
// studentRoute.post('/submit', uploadMiddleware, submitWork);
// studentRoute.get("/view-grades/:student_id", getStudenttask);
// studentRoute.get("/view-all-courses/", getAllCourses);
// studentRoute.post("/join", joinCourse);
// studentRoute.get('/my-course/:id',viewCourseStudents)
// studentRoute.get("/get-course-materials/:courseId", getCourseMaterials);
// studentRoute.get('/courses/:courseId/tasks', getAllTasks); 

// module.exports = studentRoute;
