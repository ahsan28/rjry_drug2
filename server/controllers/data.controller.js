// import Data from '../models/data.model.js';
// import Media from '../models/media.model.js';
// import User from '../models/users.model.js';
// import { ObjectId } from 'mongodb';
const multer = require("multer");
const jwt = require('jsonwebtoken');
const Data = require('../models/data.model.js');
const Media = require('../models/media.model.js');
const User = require('../models/users.model.js');
const Settings = require('../models/settings.model.js');

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
    console.log("🚀 ~ file: data.controller.js ~ line 67 ~ update ~ req.files", req.files)
    try {
        var data = await Data.findOne({ name: req.body.name });
        if (data) {
            if (data.name != 'Gallery') {
                data.title = req.body.title;
                data.description = req.body.description;
                data.lastEditDate = new Date();
                data.lastEditor = req.body.userid;
                if (req.files.cover) {
                    data.cover = req.files.cover[0]._id;
                }
                if (req.files.gallery) {
                    data.gallery = req.files.gallery.map((file) => file._id);
                }
            }
        }
    } catch (err) {
        
        res.status(400).json({ message: err.message });
    }
}

const fileUpload = async (req, res) => {
    try { // covers, footer and logo are coming from the form, check first if they are there
        console.log("🚀 ~ file: data.controller.js ~ line 67 ~ update ~ req", req.body, req.files)
        if (!req.files) {
            return res.status(400).json({ message: "No files were uploaded." });
        }
        let track = {
            isUpdated: false,
            covers: null,
            logo: null,
            footer: null,
        }
        if (req.files.covers) {
            // create Ids for the files
            // create a new Media object for each file
            track.covers = req.files.covers.map((file, index) => ({
                _id: new ObjectId(),
                ...file,
                type: file.mimetype.split('/')[0],
                extension: file.mimetype.split('/')[1],
                userid: req.body.userid
            }));
            track.isUpdated = true;
        }
        if (req.files.footer) {
            track.footer = {
                _id: new ObjectId(),
                ...req.files.footer[0],
                type: req.files.footer[0].mimetype.split('/')[0],
                extension: req.files.footer[0].mimetype.split('/')[1],
                userid: req.body.userid
            };
            track.isUpdated = true;
        }

        if (req.files.logo) {
            track.logo = {
                _id: new ObjectId(),
                ...req.files.logo[0],
                type: req.files.logo[0].mimetype.split('/')[0],
                extension: req.files.logo[0].mimetype.split('/')[1],
                userid: req.body.userid
            };
            track.isUpdated = true;
        }
        if (track.isUpdated) {
            let docs = [];
            if (track.covers) docs.push(...track.covers);
            if (track.footer) docs.push(track.footer);
            if (track.logo) docs.push(track.logo);
            // insert the files into the database
            const media = await Media.insertMany(docs).catch((err) => console.log(err));

            // update settings
            await Settings.updateOne(
                { _id: req.body._id }, 
                { $set: {
                    covers: track.covers ? track.covers.map((file) => file._id) : null,
                    footer: track.footer ? track.footer._id : null,
                    logo: track.logo ? track.logo._id : null,
                } },
                { upsert: true }
            );

            // send the response back to the client
            res.status(200).json({ message: "Files uploaded successfully!", media });
        } else {
            res.status(200).json({ message: "No files were uploaded." });
        }

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
    fileUpload
};