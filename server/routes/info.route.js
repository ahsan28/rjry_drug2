const express = require('express');
const controller = require('../controllers/info.controller.js');
const verifyJWT = require("../middlewares/auth.middleware.js");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname.toLowerCase().split(' ').join('_'))
    }
})

const upload = multer({ storage: storage })
const fields = ['files'].map(x=>({name:x}))

const router = express.Router();


// common data
router.get("/read/:id", controller.read);
router.get("/readAll/:category", controller.readAll);
router.post("/create", controller.create);
router.post("/createProduct", upload.any('files'), controller.createProduct);
router.put("/update", controller.update);
router.delete("/remove/:id", controller.remove);
router.delete("/removeFile/:id", controller.removeFile);

// export default router;
module.exports = router;