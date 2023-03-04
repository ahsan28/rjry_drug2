const express = require('express');
const controller = require('../controllers/data.controller.js');
const verifyJWT = require("../middlewares/auth.middleware.js");

// import express from "express";
// import controller from "../controllers/data.controller.js";
// import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", controller.test);
router.get("/createAll", verifyJWT, controller.create);
router.get("/getAll", verifyJWT, controller.getAll);
router.get("/:title", controller.read);
router.put("/:title", controller.update);

// export default router;
module.exports = router;