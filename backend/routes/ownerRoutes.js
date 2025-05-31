const express = require("express");
const { createVenue } = require("../controllers/owner/createVenue");
const { updateVenue } = require("../controllers/admin/updateVenue");
const { getVenueBookings } = require("../controllers/owner/getVenueBookings");
const { cancelBookingByOwner } = require("../controllers/owner/cancelBookingByOwner");
const uploadMiddleware = require("../middlewares/uploadFile");
const { myVenues } = require("../controllers/owner/myVenues");
const { getVenue } = require("../controllers/owner/getVenue");
const { ownerBookings } = require("../controllers/owner/bookings");
const { stats } = require("../controllers/owner/stats");

const ownerRoutes = express.Router();

ownerRoutes.post('/create-venue', uploadMiddleware, createVenue)
ownerRoutes.put('/update-venue/:id', updateVenue)
ownerRoutes.get('/venue-bookings/:id', getVenueBookings)
ownerRoutes.patch('/bookings/:id/cancel', cancelBookingByOwner)
ownerRoutes.get('/venues/:owner_id', myVenues)
ownerRoutes.get('/get-venue/:venue_id', getVenue)
ownerRoutes.get('/bookings/:owner_id', ownerBookings)
ownerRoutes.patch('/bookings/:id/cancel', cancelBookingByOwner)
ownerRoutes.get('/stats/:owner_id', stats)

module.exports = ownerRoutes;
