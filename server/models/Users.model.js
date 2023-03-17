// import mongoose from 'mongoose';
const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    name: { type: String },
    surname: { type: String },
    designation: { type: String },
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    about: { type: String },
    settings: {
        logo: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
        cover: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
        footer: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
        themeColor: { type: String },
        fontFamily: { type: String },
        fontColor: { type: String },
    },
    siteLinks: {
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        facebook: { type: String, default: '' },
        twitter: { type: String, default: '' },
        instagram: { type: String, default: '' },
        youtube: { type: String, default: '' },
        tiktok: { type: String, default: '' },
        whatsapp: { type: String, default: '' },
        skype: { type: String, default: '' },
        googleColab: { type: String, default: '' },
        other: { type: String, default: '' },
    },
});

const Model = mongoose.model('users', UserSchema);

module.exports = Model;