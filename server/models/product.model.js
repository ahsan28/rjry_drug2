// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    title: { type: String },
    description: { type: String },
    lastEditDate: { type: Date },
    lastEditor: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    cover: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
    gallery: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }]
});

const Model = mongoose.model('data', DataSchema);

// export default DataModel;
module.exports = Model;