const jwt = require('jsonwebtoken');
const Info = require('../models/info.model.js');
const Data = require('../models/data.model.js');
const Media = require('../models/media.model.js');
const User = require('../models/users.model.js');
const ObjectId = require("mongodb").ObjectId;


const dotenv = require('dotenv');
dotenv.config();
let TOKEN_SECRET = process.env.TOKEN_SECRET;


const read = async (req, res) => {
    try {
        const data = await Info.findById(req.params.id).populate('cover').populate('images').populate('files');
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const readAll = async (req, res) => {
    try {
        const data = await Info.find({ category: req.params.category })
        .populate('cover').populate('images').populate('files').sort({ createdAt: -1 });
        res.send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const update = async (req, res) => {
    try {
        const data = await Info.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const create = async (req, res) => {
    console.log('req.body::',req.body);
    console.log('file::',req.files);
    try {
        const data = await Info.create(req.body);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const createProduct = async (req, res) => {
    console.log('req.body::',req.body);
    console.log('req.files::',req.files);
    try {
        // save uploaded multiple files
        if (req.files?.length > 0) {
            req.body.files = req.files.map(() => new ObjectId());
            const media = await Media.insertMany(req.files.map((file, index) => ({
                _id: req.body.files[index],
                ...file,
                type: file.mimetype.split('/')[0],
                extension: file.mimetype.split('/')[1],
                name: file.filename,
                url: file.path,
                userid: req.body.userid,
                username: req.body.username,
            }))).catch((err) => console.log(err));
            console.error('media:',media);
        }
            const data = await Info.create(req.body).catch((err) => console.log(err));

        if (data) return res.status(200).json(data);
        else return res.status(400).json({ message: 'Error creating product' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// remove info doc and corresponding media docs from 'images', 'cover', 'files'
const remove = async (req, res) => {
    try {
        const data = await Info.findByIdAndRemove(req.params.id);
        console.log("🚀 ~ file: info.controller.js:86 ~ remove ~ data:", data)
        if (data) {
            // remove media docs from 'images', 'cover', 'files'
            await Media.deleteMany({ _id: { $in: [...data.images, data.cover, ...data.files] } });
            res.status(200).json(data);
        } else {
            res.status(400).json({ message: 'Error removing info' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const removeFile = async (req, res) => {
    try {
        const data = await Info.findOneAndUpdate({ files: req.params.id }, { $pull: { files: req.params.id } });
        console.log("🚀 ~ file: info.controller.js:102 ~ removeFile ~ data:", data)
        if (data) {
            await Media.deleteOne({ _id: req.params.id });
            res.status(200).json(data);
        } else {
            res.status(400).json({ message: 'Error removing file' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// export default { 
module.exports = {
    create,
    createProduct,
    read,
    readAll, 
    update,
    remove,
    removeFile
};