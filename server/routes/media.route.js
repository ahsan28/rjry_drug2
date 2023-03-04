const express = require('express');
const controller = require('../controllers/media.controller.js');
const verifyJWT = require("../middlewares/auth.middleware.js");

// import express from "express";
// import controller from "../controllers/media.controller.js";
// import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id", controller.read);

// export default router;
module.exports = router;