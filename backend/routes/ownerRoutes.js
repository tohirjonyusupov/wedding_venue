const express = require("express");
const { createVenue } = require("../controllers/owner/createVenue");
const { updateVenue } = require("../controllers/admin/updateVenue");
const { getVenueBookings } = require("../controllers/owner/getVenueBookings");
const { cancelBookingByOwner } = require("../controllers/owner/cancelBookingByOwner");
const uploadMiddleware = require("../middlewares/uploadFile");
const { myVenues } = require("../controllers/owner/myVenues");
const { getVenue } = require("../controllers/owner/getVenue");

const ownerRoutes = express.Router();

ownerRoutes.post('/create-venue', uploadMiddleware, createVenue)
ownerRoutes.put('/update-venue/:id', updateVenue)
ownerRoutes.get('/venue-bookings/:id', getVenueBookings)
ownerRoutes.patch('/bookings/:id/cancel', cancelBookingByOwner)
ownerRoutes.get('/venues/:owner_id', myVenues)
ownerRoutes.get('/get-venue/:venue_id', getVenue)

module.exports = ownerRoutes;
