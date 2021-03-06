import mongoose from 'mongoose';
import userModel from './user.model';
import balanceHistoryModel from './balanceHistory.model';
import earningsModel from './earnings.model';
import io from '../sockets';

const Schema = mongoose.Schema;

const requestSchema = new Schema({
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    approved: { type: Boolean, default: false },
    status: { type: String, default: 'pending' },
    transactionHash: { type: String, required: true, unique: true },
    requestedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    proof: { type: Array, required: true },
    amount: { type: Number, required: true, min: 1 }
});

const RequestModel = mongoose.model('Request', requestSchema);

async function newRequest(data) {
    try {
        const request = await new RequestModel(data).save();
        const user = await userModel.findUser({ _id: data.requestedBy });
        user.pendingBalance += data.amount;
        io.emit(`update ${user._id}`, 'your request has been received');
        await user.save();
        return Promise.resolve(request);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findRequests(filter) {
    try {
        return await RequestModel.find(filter)
            .populate({
                path: 'requestedBy',
                model: 'User',
                select: { password: 0 },
            }).exec();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findRequestsSlice(filter, limit) {
    try {
        return await RequestModel.find(filter).limit(limit)
            .populate({
                path: 'requestedBy',
                model: 'User',
                select: { password: 0 },
            }).exec();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function insertBalanceHistory(newHistories) {
    try {
        const result = await balanceHistoryModel.insertMany(newHistories);
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function approveRequest(requestId, amount) {
    const histories = [];

    try {
        const request = await RequestModel.findOne({ _id: requestId });
        const user = await userModel.findUser({ _id: request.requestedBy });

        user.pendingBalance -= request.amount;
        user.balance += amount;
        user.lastUpdated = new Date();

        request.approved = true;
        request.status = 'approved';
        request.lastUpdated = new Date();

        histories.push({
            amount: user.balance,
            belongsTo: user._id
        });

        histories.push({
            amount: amount,
            belongsTo: user._id,
            summary: false
        });

        if (user.referralCode !== null) {
            const referredBy = await userModel.findUser({ affiliateCode: user.referralCode });
            referredBy.balance += (amount / 100) * referredBy.percentage;

            histories.push({
                amount: referredBy.balance,
                belongsTo: referredBy._id
            });

            histories.push({
                amount: (amount / 100) * referredBy.percentage,
                belongsTo: referredBy._id,
                summary: false
            });

            await earningsModel.create({
                amount: (amount / 100) * referredBy.percentage,
                belongsTo: referredBy._id,
                cameFrom: user._id
            });
            referredBy.lastUpdated = new Date();
            io.emit(`update ${user._id}`, 'you have earned money');
            await referredBy.save();
        }

        io.emit(`update ${user._id}`, 'your request has been approved');
        await insertBalanceHistory(histories);
        await request.save();
        await user.save();
        return Promise.resolve(request);

    } catch (err) {
        console.log(err);

        return Promise.reject(err);
    }
}

async function rejectRequest(requestId) {
    try {
        const request = await RequestModel.findOne({ _id: requestId });
        const user = await userModel.findUser({ _id: request.requestedBy });

        request.status = 'rejected';
        request.lastUpdated = new Date();
        user.pendingBalance -= request.amount;
        user.lastUpdated = new Date();
        io.emit(`update ${user._id}`, 'your request has been rejected');
        await request.save();
        await user.save();
        return Promise.resolve(request);
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { newRequest, findRequests, approveRequest, rejectRequest, findRequestsSlice };
