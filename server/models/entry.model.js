import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    amount: { type: Number },
    date: { type: Date, required: true, default: Date.now },
    isInitial: { type: Boolean },
    other: {
        cost: { type: Number },
        description: { type: String },
    }
}, { timestamps: true });

const EntryModel = mongoose.model('entries', EntrySchema);

export default EntryModel;