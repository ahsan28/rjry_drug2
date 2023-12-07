const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    name: { type: String },
    header: {
        _id: false,
        color: { type: String },
        backgroundColor: { type: String },
        fontFamily: { type: String },
        fontSize: { type: String },
    },
    stripe: {
        _id: false,
        color: { type: String },
        backgroundColor: { type: String },
        fontFamily: { type: String },
        fontSize: { type: String },
    },
    body: {
        _id: false,
        color: { type: String },
        backgroundColor: { type: String },
        fontFamily: { type: String },
        fontSize: { type: String },
    },

    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },

    logo: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
    covers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }],
    footer: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },

    links: [{
        _id: false,
        url: { type: String },
        name: { type: String },
    }]
}, { timestamps: true });

// module.exports = SettingsSchema;
const Model = mongoose.model('settings', SettingsSchema);

module.exports = Model;