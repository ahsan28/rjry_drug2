const jwt = require('jsonwebtoken');
const Activity = require('../models/activity.model.js');
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
        const data = await Activity.findById(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const readAll = async (req, res) => {
    try {
        const data = await Info.find({ category: 'activity', infoType: req.params.infoType }).sort({ createdAt: -1 });
        res.send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const update = async (req, res) => {
    try {
        const data = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const create = async (req, res) => {
    console.log('req.body::',req.body);
    console.log('req.files::',req.files);
    try {
        // const data = await Activity.create(req.body);
        if(req.files.length>0){
            req.body.images = req.files.map(() => new ObjectId());
            console.log("🚀 ~ file: activity.controller.js:50 ~ create ~ req.body:", req.body)
            const media = await Media.insertMany(req.files.map((file, index) => ({
                _id: req.body.images[index],
                ...file,
                type: file.mimetype.split('/')[0],
                extension: file.mimetype.split('/')[1],
                name: file.filename,
                url: file.path,
                username: req.body.username,
                userid: req.body.userid,
                
            }))).catch((err) => {
                console.error('err:',err);
            });
            console.error('media:',media);
            const activity = await Info.create(req.body).catch((err) => console.error('err:',err));

            if(activity){
                return res.status(201).json({ message: 'Activity created successfully', media: media, activity: activity });
            } else {
                return res.status(400).json({ message: 'Activity not created' });
            }
        } else {
            const activity = await Info.create(req.body);
            if(activity){
                return res.status(201).json({ message: 'Activity created successfully', activity: activity });
            } else {
                return res.status(400).json({ message: 'Activity not created' });
            }
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const remove = async (req, res) => {
    try {
        await Activity.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


// export default { 
module.exports = {
    create,
    read,
    readAll, 
    update,
    remove,
};