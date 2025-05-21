const express = require("express");
const { login } = require("../controllers/auth/login");
const { getAllDistricts } = require("../controllers/client/getAllDistricts");

const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.get("/get-districts", getAllDistricts);


module.exports = authRoutes;