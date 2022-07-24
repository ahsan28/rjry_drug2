import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    units: [{ 
        name: String, 
    }],
    type: { type: String },
}, { timestamps: true });

const PropertyModel = mongoose.model('properties', PropertySchema);

export default PropertyModel;