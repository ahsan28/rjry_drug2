// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
    category: { type: String },
    infoType: { type: String },
    title: { type: String },
    link: { type: String },
    
    // extra
    description: { type: String },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    username: { type: String },
    description: { type: String },
    details: { type: String },
    cover: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }],
    // videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }],
    // audios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }],
    // documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }],

}, { timestamps: true });

const Model = mongoose.model('info', InfoSchema);

// export default InfoModel;
module.exports = Model;