const express = require('express');
const controller = require('../controllers/users.controller.js');
const verifyJWT = require("../middlewares/auth.middleware.js");

// import express from "express";
// import controller from "../controllers/users.controller.js";
// import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:username", verifyJWT, controller.read);
router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/send", controller.sendEmail);

// export default router;
module.exports = router;