const express = require("express");
const { createOwner } = require("../controllers/admin/createOwner");
const { createVenue } = require("../controllers/admin/createVenue");
const { assignOwner } = require("../controllers/admin/assignOwner");
const { confirimVenue } = require("../controllers/admin/confirimVenue");
const { deleteVenue } = require("../controllers/admin/deleteVenue");
const { updateVenue } = require("../controllers/admin/updateVenue");
const { getAllVenues } = require("../controllers/admin/getAllVenues");
const { searchVenue } = require("../controllers/admin/searchVenue");
const { getVenueById } = require("../controllers/admin/getVenueById");
const { getVenueOwner } = require("../controllers/admin/getVenueOwner");
const { getAllBookings } = require("../controllers/admin/getAllBookings");
const uploadMiddleware = require("../middlewares/uploadFile");
const { cancelledBooking } = require("../controllers/admin/cancelledBooking");
const { stats } = require("../controllers/admin/stats");

const adminRoute = express.Router();

adminRoute.post("/create-owner", createOwner)
adminRoute.post("/create-venue", uploadMiddleware, createVenue);
adminRoute.post("/assign-owner", assignOwner);
adminRoute.post("/confirm-venue/:venue_id", confirimVenue);
adminRoute.delete("/delete-venue/:venue_id", deleteVenue);
adminRoute.put("/update-venue/:venue_id", updateVenue);
adminRoute.get("/venues", getAllVenues);
adminRoute.get("/search-venue", searchVenue);
adminRoute.get("/venues/:venue_id", getVenueById);
adminRoute.get("/venue-owners", getVenueOwner);
adminRoute.get("/bookings", getAllBookings);
adminRoute.patch("/cancelled-booking/:id", cancelledBooking);
adminRoute.get("/stats", stats)

module.exports = adminRoute;