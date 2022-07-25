import express from "express";
import controller from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats/:year", controller.stats);

export default router;