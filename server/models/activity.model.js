const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    name: { type: String },
    title: { type: String },
    description: { type: String },
    links: [{ type: String }],
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },

    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }],
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }],
    audios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }],
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }],
}, { timestamps: true });

const Model = mongoose.model('activity', ActivitySchema);

// export default ActivityModel;
module.exports = Model;