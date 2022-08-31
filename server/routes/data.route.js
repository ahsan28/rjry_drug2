import express from "express";
import controller from "../controllers/data.controller.js";

const router = express.Router();

router.get("/createAll", controller.create);
router.get("/getAll", controller.getAll);
router.get("/:title", controller.read);

export default router;