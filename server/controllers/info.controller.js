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
        const data = await Info.findById(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const readAll = async (req, res) => {
    try {
        const data = await Info.find({});
        res.send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const update = async (req, res) => {
    try {
        const data = await Info.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const create = async (req, res) => {
    console.log('req.body::',req.body);
    console.log('req.files::',req.files);
    try {
        // const data = await Info.create(req.body);
        res.status(201).json('data');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const remove = async (req, res) => {
    try {
        await Info.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Info deleted successfully' });
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