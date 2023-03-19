// import Data from '../models/data.model.js';
// import Media from '../models/media.model.js';
// import User from '../models/users.model.js';
// import { ObjectId } from 'mongodb';
const multer = require("multer");
const jwt = require('jsonwebtoken');
const Data = require('../models/data.model.js');
const Media = require('../models/media.model.js');
const User = require('../models/users.model.js');
const ObjectId = require("mongodb").ObjectId;


const dotenv = require('dotenv');
dotenv.config();
let TOKEN_SECRET = process.env.TOKEN_SECRET;


const test = (req, res) => {
    res.send('Hello World! poly!!');
}


// create a new data for database
const create = async (req, res) => {
    try {
        const media = await Media.create({
            _id: "100000000000000000000000",
            title: 'demo',
            name: 'demo',
            description: 'demo',
            url: 'demo',
            type: 'image'
        });
        const user = await User.create({
            _id: "200000000000000000000000",
            name: 'demo',
            email: 'demo',
            password: 'demo'
        });
        const data = await Data.create({
            _id: "300000000000000000000000",
            title: 'demo',
            name: 'demo',
            description: 'demo',
            lastEditDate: new Date(),
            lastEditor: "200000000000000000000000",
            cover: "100000000000000000000000",
            gallery: ["100000000000000000000000"]
        });
        res.send({ data, gallery, user });
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const read = async (req, res) => {
    try {
        const data = await Data.findOne({ name: req.params.name })
            // .populate([
            //     { path: 'cover' },
            //     { path: 'gallery' }
            // ])
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getAll = async (req, res) => {
    try {
        const data = await Data.find({});
        res.send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const update = async (req, res) => {
    console.log("🚀 ~ file: data.controller.js ~ line 67 ~ update ~ req.body", req.body)
    try {
        
        if (req.body.name == 'Gallery'){
            if (!req.body.gallery) req.body.gallery = []
            let oldGalleryIds = req.body.gallery.filter(item => item._id).map(item => item._id)
            let imagesToSave = req.body.gallery.filter(item => !item._id)
            let newImageIds = imagesToSave.map(() => new ObjectId())
            imagesToSave = imagesToSave.map((image, index) => {
                image._id = newImageIds[index]
                return image
            })
            await Media.insertMany(imagesToSave).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
            req.body.gallery = [...oldGalleryIds, ...newImageIds]
        }

        if (req.body.cover && !req.body.cover.saved){
            let newImageId = new ObjectId()
            req.body.cover._id = newImageId
            await Media.create(req.body.cover).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
            req.body.cover = newImageId
        }

        const data = await Data.findOneAndUpdate(
            { name: req.params.name }, 
            {$set: req.body},
            { new: true, upsert: true })
        .then((data) => {
            console.log(data)
            return data
        })
        .catch((err) => {
            console.log("update error!!!")
            console.log(err)
        })
        res.status(200).json(data);
    } catch (err) {
        
        res.status(400).json({ message: err.message });
    }
}

const fileUpload = async (req, res) => {
    try { // cover and logo are coming from the form, with font and theme color fields
        const body = req.body;
        let settings = {}
        let files = await Promise.all(Object.keys(req.files).map((key) => {
            const file = req.files[key];
            let fileData = file[0];
            settings[key] = new ObjectId();
            return {
                ...fileData,
                _id: settings[key],
                type: fileData.mimetype.split('/')[0],
                extension: fileData.mimetype.split('/')[1],
                url: fileData.path,
                userid: body.userid,
                username: body.username,
            };
        }));

        let user = await User.findById(body.userid);
        if (body) {
            settings = {
                ...user.settings,
                ...settings,
                themeColor: body.themeColor,
                fontFamily: body.fontFamily,
                fontColor: body.fontColor,
            }
        }
        
        Media.insertMany(files).then((media) => {
            User.findByIdAndUpdate(
                body.userid, 
                { $set: { settings } },
                { new: true, upsert: true }
            ).then((user) => {
                let token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
                user.password = undefined;
                user.__v = undefined;
                user.accessToken = token;
                res.status(200).send({ message: 'Settings updated successfully', user });
            }).catch((err) => {
                res.status(400).send({ message: err.message });
            })
        }).catch((err) => {
            res.status(400).send({ message: err.message });
        })

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
        
}


// export default { 
module.exports = {
    test,
    read,
    create,
    getAll, 
    update,
    fileUpload
};