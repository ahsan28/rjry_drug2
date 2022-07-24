import express from "express";
import controller from "../controllers/entry.controller.js";

const router = express.Router();

router.get("/get/:id", controller.get);
router.get("/getAll", controller.getAll);
router.post("/new", controller.create);
router.put("/update", controller.update);
router.delete("/remove/:id", controller.remove);

export default router;