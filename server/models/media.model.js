import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    url: { type: String },
    type: { type: String, enum: ['image', 'video', 'audio'] }
});

const MediaModel = mongoose.model('media', MediaSchema);

export default MediaModel;