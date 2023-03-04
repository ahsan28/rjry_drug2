// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    contentType: { type: String },
    extension: { type: String },
    path: { type: String, unique: true },
    size: { type: Number },

    saved: { type: Boolean, default: true },
    content: { type: Buffer },
    url: { type: String },
});

const Model = mongoose.model('media', MediaSchema);

// export default MediaModel;
module.exports = Model;