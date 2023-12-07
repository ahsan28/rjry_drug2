// import Media from '../models/media.model.js';
const Media = require('../models/media.model.js');

const read = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        res.json(media);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const loadImage = async (req, res) => {
    // from /public/uploads
    try {
        const media = await Media.findById(req.params.id).catch(err=>console.log(err));
        if(!media) return res.status(404).json("No media found.");
        else return res.sendFile(media.filename, { root: media.destination });
        
    }
    catch (err) {
        console.log(err);
    }
}

const loadImages = async (req, res) => {
    // from /public/uploads
    try {
        const media = await Media.find({_id: {$in: req.body}});
        res.sendFile(media.map(m => m.filename), { root: media.destination });

    }
    catch (err) {
        console.log(err);
    }
}

const update = async (req, res) => {
    try {
        const media = await Media.updateOne({ _id: req.body._id }, req.body, { new: true });
        res.json(media);
    }
    catch (err) {
        console.log(err);
    }   
}

module.exports = {
    read, 
    loadImage,
    loadImages,
    update
};