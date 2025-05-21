import React from "react";
import AdminLayout from "../layouts/AdminLayout";
// import TeacherLayout from "../layouts/TeacherLayout";
import Admin from "../pages/Admin";
import ViewStudents from "../pages/Owner/viewstudent";
import StudentCoursePage from "../pages/Owner/StudentCoursePage";
import MyCourse from "../pages/Owner/MyCourse";
import Viewmaterials from "../pages/Owner/Viewmaterials";
import SubmitWorkPage from "../pages/Owner/SubmitWorkPage";
import GetAllTasks from "../pages/Owner/GetAllTasks";
import CreateVenue from "../pages/Owner/CreateVenue";
import CreateOwner from "../pages/Admin/CreateOwner";
import AllVenues from "../pages/Admin/AllVenues";
import EditVenue from "../pages/Admin/EditVenue";
import SingleVenue from "../pages/Admin/SingleVenue";
import AllBookings from "../pages/Admin/AllBookings";
import Owner from "../pages/Owner";
import OwnerLayout from "../layouts/OwnerLayout";
import MyVenues from "../pages/Owner/MyVenues";
import UpdateVenue from "../pages/Owner/UpdateVenue";
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
      { path: "bookings", element: <AllBookings /> },
    ],
  },
  {
    path: "/owner",
    layout: OwnerLayout,
    children: [
      { path: "", element: <Owner /> },
      { path: "create-venue", element: <CreateVenue /> },
      { path: "create-venue", element: <CreateVenue /> },
      { path: "my-venues", element: <MyVenues /> },
      { path: "my-venues/:venue_id/edit", element: <UpdateVenue /> },
      // { path: "viewStudent", element: <ViewStudents /> },
      // { path: "view-all-course", element: <StudentCoursePage /> },
      // { path: "my-course", element: <MyCourse /> },
      // { path: "my-course/course/:id", element: <Viewmaterials /> },
      // { path:"submit/:taskId", element:<SubmitWorkPage/>},
      // { path:"task/:courseId", element:<GetAllTasks/>}
    ],
  },
];

export default routes;
