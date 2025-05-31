import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import Admin from "../pages/Admin";
import Owner from "../pages/Owner";

import CreateVenue from "../pages/Owner/CreateVenue";
import CreateOwner from "../pages/Admin/CreateOwner";
import AllVenues from "../pages/Admin/AllVenues";
import EditVenue from "../pages/Admin/EditVenue";
import SingleVenue from "../pages/Admin/SingleVenue";
import AllBookings from "../pages/Admin/AllBookings";
import MyVenues from "../pages/Owner/MyVenues";
import UpdateVenue from "../pages/Owner/UpdateVenue";
import Bookings from "../pages/Owner/Bookings";

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
      { path: "venues/:venue_id", element: <SingleVenue /> },
      { path: "my-venues/:venue_id/edit", element: <UpdateVenue /> },
      { path: "bookings", element: <Bookings /> },
    ],
  },
];

export default routes;
