const express = require('express');
const controller = require('../controllers/users.controller.js');
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
const profileDataFileFields = ['avatar'].map(x=>({name:x}))

const router = express.Router();

router.get("/read/:id", controller.read);
router.get("/settings", controller.getSettings);
router.get("/settings/:id", controller.getSettings);
router.put("/settings/:userid", controller.saveSettings);
router.get("/readAll", controller.readAll);
router.post("/signup", controller.signup);
router.put("/login", controller.login);
router.put("/updateLinks/:username", controller.updateLinks);
router.post("/send", controller.sendEmail);
router.put("/updateprofile/:username", upload.fields(profileDataFileFields), controller.updateProfile);
router.post("/createmember", upload.fields(profileDataFileFields), controller.createMember);
router.put("/updatemember", upload.fields(profileDataFileFields), controller.updateMember);

// export default router;
module.exports = router;