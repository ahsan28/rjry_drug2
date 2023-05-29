// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
    catagory: { type: String },
    type: { type: String },
    title: { type: String },
    link: { type: String },
    
    // extra
    description: { type: String },
    details: { type: String },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
    gallery: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }]
}, { timestamps: true });

const Model = mongoose.model('info', InfoSchema);

// export default InfoModel;
module.exports = Model;