import express from "express";
import controller from "../controllers/media.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id", verifyJWT, controller.read);

export default router;