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
const fields = ['logo','cover','footer'].map(x=>({name:x}))

const router = express.Router();


// common data
router.get("/read/:id", controller.read);
router.get("/readAll", verifyJWT, controller.readAll);
router.post("/create", verifyJWT, controller.create);
router.put("/update/:id", verifyJWT, controller.update);
router.delete("/remove/:id", verifyJWT, controller.remove);

// export default router;
module.exports = router;