import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const earningsSchema = new Schema({
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    amount: { type: Number, required: true },
    belongsTo: { type: Schema.Types.ObjectId, required: true },
    cameFrom: { type: Schema.Types.ObjectId, required: true }
});

const EarningsModel = mongoose.model('Earnings', earningsSchema);

async function create(data) {
    try {
        return await new EarningsModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function myEarnings(id) {
    const select = {
        password: 0,
        emailVerified: 0,
        identityVerified: 0,
        token: 0,
        resetPasswordToken: 0,
        balance: 0,
        affiliateCode: 0,
        pendingBalance: 0,
        percentage: 0,
        referrals: 0,
        tos: 0,
        administrator: 0,
        updatedAt: 0,
    };

    try {
        return await EarningsModel.find({ belongsTo: id }).populate({
            path: 'cameFrom',
            model: 'User',
            select: select
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { create, myEarnings };