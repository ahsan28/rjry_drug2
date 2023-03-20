// import mongoose from 'mongoose';
const mongoose = require('mongoose');
// const SettingsSchema = require('./settings.model');


const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },

    initials: { type: String },
    name: { type: String },
    surname: { type: String },
    designation: { type: String },
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },

    address: { type: String },
    phone: { type: String },
    email: { type: String },
    about: { type: String },
    // settings: { type: SettingsSchema },
    settings: { type: mongoose.Schema.Types.ObjectId, ref: 'settings' },
});

const Model = mongoose.model('users', UserSchema);

module.exports = Model;