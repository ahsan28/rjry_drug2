import mongoose from 'mongoose';

const ContractSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    unit: { type: mongoose.Schema.Types.ObjectId },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, default: 'active' },
    rate: { type: Number, required: true },
    scannedDocument: { type: String }, // upload image/pdf
}, { timestamps: true });

const ContractModel = mongoose.model('contracts', ContractSchema);

export default ContractModel;  