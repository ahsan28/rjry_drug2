import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    title: { type: String, unique: true },
    description: { type: String },
    lastEditDate: { type: Date },
    lastEditor: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    cover: { type: mongoose.Schema.Types.ObjectId, ref: 'media' },
    gallery: [{ type: mongoose.Schema.Types.ObjectId, ref: 'media' }]
});

const DataModel = mongoose.model('data', DataSchema);

export default DataModel;