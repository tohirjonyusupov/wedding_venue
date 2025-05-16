const express = require("express");
const { createVenue } = require("../controllers/owner/createVenue");
const { updateVenue } = require("../controllers/admin/updateVenue");
const { getVenueBookings } = require("../controllers/owner/getVenueBookings");
const { cancelBookingByOwner } = require("../controllers/owner/cancelBookingByOwner");

const ownerRoutes = express.Router();

ownerRoutes.post('/create-venue', createVenue)
ownerRoutes.put('/update-venue/:id', updateVenue)
ownerRoutes.get('/venue-bookings/:id', getVenueBookings)
ownerRoutes.patch('/bookings/:id/cancel', cancelBookingByOwner)

module.exports = ownerRoutes;
