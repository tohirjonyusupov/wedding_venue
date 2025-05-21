import React from "react";
import AdminLayout from "../layouts/AdminLayout";
// import TeacherLayout from "../layouts/TeacherLayout";
import StudentLayout from "../layouts/StudentLayout";
import Admin from "../pages/Admin";
import Student from "../pages/Student/viewstudent";
import ViewStudents from "../pages/Student/viewstudent";
import AdminPage from "../pages/Admin/AddUserpage";
import ViewAllTeachers from "../pages/Admin/ViewAllTeacher";
import StudentTable from "../pages/Admin/AllUsers";
import StudentCoursePage from "../pages/Student/StudentCoursePage";
import MyCourse from "../pages/Student/MyCourse";
import Viewmaterials from "../pages/Student/Viewmaterials";
import CreateCourse from "../pages/Admin/CreateCourse";
import SubmitWorkPage from "../pages/Student/SubmitWorkPage";
import GetAllTasks from "../pages/Student/GetAllTasks";
import Venues from "../pages/Client/Venues";
import CreateVenue from "../pages/Admin/CreateVenue";
import CreateOwner from "../pages/Admin/CreateOwner";
import AllVenues from "../pages/Admin/AllVenues";
import EditVenue from "../pages/Admin/EditVenue";
import SingleVenue from "../pages/Admin/SingleVenue";
export const routes = [
  {
    path: "/admin",
    layout: AdminLayout,
    children: [
      { path: "", element: <Admin /> },
      { path: "create-venue", element: <CreateVenue /> },
      { path: "create-owner", element: <CreateOwner /> },
      { path: "all-venues", element: <AllVenues /> },
      { path: "venues/:venue_id/edit", element: <EditVenue /> },
      { path: "venues/:venue_id", element: <SingleVenue /> },
      // { path: 'add-user', element: <AdminPage /> },
      // { path: 'view-all-teachers', element: <ViewAllTeachers /> },
      // { path: 'addCourse', element: <CreateCourse /> }
    ],
  },
  {
    path: "/client",
    layout: StudentLayout,
    children: [
      { path: "", element: <Venues /> },
    ],
  },
  {
    path: "/student",
    layout: StudentLayout,
    children: [
      { path: "", element: <Student /> },
      { path: "viewStudent", element: <ViewStudents /> },
      { path: "view-all-course", element: <StudentCoursePage /> },
      { path: "my-course", element: <MyCourse /> },
      { path: "my-course/course/:id", element: <Viewmaterials /> },
      { path:"submit/:taskId", element:<SubmitWorkPage/>},
      { path:"task/:courseId", element:<GetAllTasks/>}

      
    ],
  },
];

export default routes;
