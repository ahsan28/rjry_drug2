// import mongoose from 'mongoose';
const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    name: { type: String },
    surname: { type: String },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    about: { type: String },
    settings: {
        themeColor: { type: String },
        logo: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
        homepageImage: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
        footerImage: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
        fontFamily: { type: String },
        fontColor: { type: String },
        googleColab: { type: String },
    }
});

const Model = mongoose.model('users', UserSchema);

module.exports = Model;