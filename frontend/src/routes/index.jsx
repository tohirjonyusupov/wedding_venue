import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import Admin from "../pages/admin";
import Owner from "../pages/owner";

import CreateVenueAdmin from "../pages/admin/CreateVenueAdmin";
import CreateVenue from "../pages/owner/CreateVenueOwner";
import CreateOwner from "../pages/admin/CreateOwner";
import AllVenues from "../pages/admin/AllVenues";
import EditVenue from "../pages/admin/EditVenue";
import SingleVenue from "../pages/admin/SingleVenue";
import AllBookings from "../pages/admin/AllBookings";
import MyVenues from "../pages/owner/MyVenues";
import UpdateVenue from "../pages/owner/UpdateVenue";
import Bookings from "../pages/owner/Bookings";
import CreateVenueOwner from "../pages/owner/CreateVenueOwner";

export const routes = [
  {
    path: "/admin",
    layout: AdminLayout,
    children: [
      { path: "", element: <Admin /> },
      { path: "add-venue", element: <CreateVenueAdmin /> },
      { path: "create-owner", element: <CreateOwner /> },
      { path: "venues", element: <AllVenues /> },
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
      { path: "add-venue", element: <CreateVenueOwner /> },
      { path: "venues", element: <MyVenues /> },
      { path: "venues/:venue_id", element: <SingleVenue /> },
      { path: "venues/:venue_id/edit", element: <UpdateVenue /> },
      { path: "bookings", element: <Bookings /> },
    ],
  },
];

export default routes;
