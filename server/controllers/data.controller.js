// import Data from '../models/data.model.js';
// import Media from '../models/media.model.js';
// import User from '../models/users.model.js';
// import { ObjectId } from 'mongodb';

const Data = require('../models/data.model.js');
const Media = require('../models/media.model.js');
const User = require('../models/users.model.js');
const ObjectId = require("mongodb").ObjectId;
const test = (req, res) => {
    res.send('Hello World! poly!!');
}


// create a new data for database
const create = async (req, res) => {
    try {
        const media = await Media.create({
            _id: "100000000000000000000000",
            title: 'demo',
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
        const data = await Data.findOne({ title: req.params.title })
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
        
        if (req.body.title == 'Gallery'){
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

        const data = await Data.findOneAndUpdate({ title: req.params.title }, req.body, { new: true, upsert: true })
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// export default { 
module.exports = {
    test,
    read,
    create,
    getAll, 
    update,
};