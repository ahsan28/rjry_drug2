const express = require('express');
const controller = require('../controllers/data.controller.js');
const verifyJWT = require("../middlewares/auth.middleware.js");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname.toLowerCase().split(' ').join('_'))
    }
})

const upload = multer({ storage: storage })
const fields = [
    { name: 'logo' },
    { name: 'cover' },
    { name: 'footer' },
  ]

// import express from "express";
// import controller from "../controllers/data.controller.js";
// import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", controller.test);
router.get("/createAll", verifyJWT, controller.create);
router.get("/getAll", verifyJWT, controller.getAll);
router.get("/:title", controller.read);
router.put("/:title", controller.update);
router.post("/upload", upload.fields(fields), controller.fileUpload);

// export default router;
module.exports = router;