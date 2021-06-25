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
    summary: {
        type: Boolean,
        default: true,
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

async function getHistory(filter) {
    try {
        return await BalanceHistoryModel.find(filter);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function insertMany(data) {
    try {
        return await BalanceHistoryModel.insertMany(data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { create, getHistory, insertMany };
