// import Media from '../models/media.model.js';
const Media = require('../models/media.model.js');

const read = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        res.send(media);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const loadImage = async (req, res) => {
    // from /public/uploads
    try {
        const media = await Media.findById(req.params.id);
        res.sendFile(media.filename, { root: 'public/uploads' });
    }
    catch (err) {
        console.log(err);
    }
}

const loadImages = async (req, res) => {
    // from /public/uploads
    try {
        const media = await Media.find({_id: {$in: req.body}});
        res.sendFile(media.map(m => m.filename), { root: 'public/uploads' });

    }
    catch (err) {
        console.log(err);
    }
}
module.exports = {
    read, 
    loadImage,
    loadImages,
};