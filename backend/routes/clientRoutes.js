const express = require('express');

const clientRoutes = express.Router();

const { clientSignUp } = require('../controllers/client/ClientSignUp');

clientRoutes.post('/signup', clientSignUp);

module.exports = clientRoutes;