const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    name: { type: String },
    fontFamily: { type: String },
    sheds: { type: mongoose.Schema.Types.Mixed },
  
    
    logo: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
    covers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }],
    footer: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
    
    links: [{
        _id: false,
        url: { type: String },
        name: { type: String },
    }],
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

// module.exports = SettingsSchema;
const Model = mongoose.model('settings', SettingsSchema);

module.exports = Model;