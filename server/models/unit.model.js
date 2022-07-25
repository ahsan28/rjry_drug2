import mongoose from 'mongoose';

const UnitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'properties', required: true }, // dual link
}, { timestamps: true });

const UnitModel = mongoose.model('units', UnitSchema);

export default UnitModel;