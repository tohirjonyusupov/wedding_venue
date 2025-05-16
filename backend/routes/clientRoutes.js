const express = require('express');

const clientRoutes = express.Router();

const { clientSignUp } = require('../controllers/client/ClientSignUp');
const { getVenues } = require('../controllers/client/getVenues');
const { createBooking } = require('../controllers/client/createBooking');
const { getMyBookings } = require('../controllers/client/getMyBookings');
const { cancelMyBooking } = require('../controllers/client/cancelMyBookings');
const { getAllDistricts } = require('../controllers/client/getAllDistricts');

clientRoutes.post('/signup', clientSignUp);
clientRoutes.get('/venues', getVenues);
clientRoutes.post('/bookings', createBooking);
clientRoutes.get('/my-bookings', getMyBookings);
clientRoutes.patch('/my-bookings/:id/cancel', cancelMyBooking);
clientRoutes.get('/districts', getAllDistricts);

module.exports = clientRoutes;