// import mongoose from 'mongoose';
const mongoose = require('mongoose');
// const SettingsSchema = require('./settings.model');


const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
    rank: { type: Number, default: 100 },

    initials: { type: String },
    name: { type: String },
    surname: { type: String },
    designation: { type: String },
    expertise: { type: String },
    affiliation: { type: String },
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
    memberType: { type: String },

    address: { type: String },
    phone: { type: String },
    email: { type: String },
    about: { type: String },
    link: { type: String },
    // settings: { type: SettingsSchema },
    settings: { type: mongoose.Schema.Types.ObjectId, ref: 'settings' },
});

const Model = mongoose.model('users', UserSchema);

module.exports = Model;