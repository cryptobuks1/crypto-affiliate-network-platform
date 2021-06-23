import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const balanceHistorySchema = new Schema({
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    amount: {
        type: Number,
        required: true,
    },
    belongsTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const BalanceHistoryModel = mongoose.model(
    'BalanceHistory',
    balanceHistorySchema
);

async function create(data) {
    try {
        return await new BalanceHistoryModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { create };