const jwt = require('jsonwebtoken');
const Activity = require('../models/activity.model.js');
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
        const data = await Activity.find({});
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
        res.status(201).json('data');
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