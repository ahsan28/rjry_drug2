import express from "express";
import controller from "../controllers/users.controller.js";

const router = express.Router();

router.get("/getAll", controller.getAll);

export default router;