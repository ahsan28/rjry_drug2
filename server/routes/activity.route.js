const express = require('express');
const controller = require('../controllers/activity.controller.js');
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
const fields = ['images'].map(x=>({name:x}))

const router = express.Router();


// common data
router.get("/read/:id", controller.read);
router.get("/readAll/:infoType", controller.readAll);
router.post("/create", upload.any('images'), controller.create);
router.put("/update/:id", controller.update);
router.delete("/remove/:id", controller.remove);

// export default router;
module.exports = router;