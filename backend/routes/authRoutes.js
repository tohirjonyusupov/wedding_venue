const express = require("express");
const { login } = require("../controllers/auth/login");
const { editProfile } = require("../controllers/auth/editProfile");

const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.put('/editProfile/:user_id', editProfile);

module.exports = authRoutes;