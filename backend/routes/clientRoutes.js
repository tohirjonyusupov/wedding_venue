const express = require("express");
const teacherRouter = express.Router();

// import materials controllers
const {
  addMaterials,
  getAllMaterials,
  getMaterialById,
} = require("../controllers/teacher/addMaterial");

// import student work controllers
const { gradeWork } = require("../controllers/teacher/gradeStudent");

// import student controllers
// ...

// import courses controllers
const { getAllCourses, addTask, getAllTasks } = require("../controllers/teacher/viewCourses");
const { deleteStudent, removeStudent } = require("../controllers/teacher/removeSudent");
const { viewCourseStudents } = require("../controllers/student/viewCourses");
const uploadMiddleware = require("../middlewares/uploadFile");
const viewStudentsOfCourse = require("../controllers/student/viewCourseByStudentId");
const { checkRole } = require("../middlewares/checkRole");
const { getAllSubmitWorks } = require("../controllers/teacher/studentWork");
// ...


teacherRouter.use(checkRole(['teacher']))

// material routes
teacherRouter.post("/add-materials", uploadMiddleware, addMaterials);
teacherRouter.get("/get-all-materials", getAllMaterials);
teacherRouter.get("/get-material-detail/:course_id", getMaterialById);
teacherRouter.get("/get-course-students/:course_id", viewStudentsOfCourse);

// grade student work routes
teacherRouter.put("/:id/grade", gradeWork);

// student routes
// teacherRouter.delete("/delete-student/:id", deleteStudent);
teacherRouter.delete("/remove-student/:enrollment_id", removeStudent);

// courses routes
teacherRouter.get("/:teacherId/courses", getAllCourses);
teacherRouter.post("/add-task", addTask)
teacherRouter.get('/get-tasks',getAllTasks)
teacherRouter.get("/course-students", viewCourseStudents);
teacherRouter.get('/student-work/:teacherId', getAllSubmitWorks)

module.exports = teacherRouter;
