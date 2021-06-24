import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const kycSchema = new Schema({
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    files: {
        type: Array,
        required: true,
    },
    belongsTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        default: 'pending',
    },
});

const KycModel = mongoose.model('kyc', kycSchema);

async function newKyc(data) {
    try {
        return await new KycModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findKycs(filter) {
    try {
        return await KycModel.find(filter);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findKyc(filter) {
    try {
        return await KycModel.findOne(filter);
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { newKyc, findKycs, findKyc };
