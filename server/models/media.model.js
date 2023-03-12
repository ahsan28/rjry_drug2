// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    destination: { type: String },
    filename: { type: String },
    path: { type: String },
    size: { type: Number },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    username: { type: String },
}, { timestamps: true });

const Model = mongoose.model('media', MediaSchema);

// export default MediaModel;
module.exports = Model;