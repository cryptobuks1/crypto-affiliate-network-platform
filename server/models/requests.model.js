import mongoose from 'mongoose';
import userModel from './user.model';
import balanceHistoryModel from './balanceHistory.model';
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    approved: { type: Boolean, default: false },
    status: { type: String, default: 'pending' },
    transactionHash: { type: String, required: true, unique: true },
    requestedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    proof: { type: Array, required: true },
    amount: { type: Number, required: true, min: 1 },
});

const RequestModel = mongoose.model('Request', requestSchema);

async function newRequest(data) {
    try {
        const request = await new RequestModel(data).save();
        const user = await userModel.findUser({ _id: data.requestedBy });
        user.pendingBalance += data.amount;
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
            })
            .exec();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function approveRequest(requestId) {
    try {
        const request = await RequestModel.findOne({ _id: requestId });
        const user = await userModel.findUser({ _id: request.requestedBy });

        if (user.referralCode != null) {
            const referredBy = await userModel.findUser({
                affiliateCode: user.referralCode,
            });
            referredBy.balance +=
                (request.amount / 100) * referredBy.percentage;
            await balanceHistoryModel.create({
                amount: referredBy.balance,
                belongsTo: referredBy._id,
            });
            await referredBy.save();
        }

        request.approved = true;
        user.pendingBalance -= request.amount;
        user.balance += request.amount;

        await balanceHistoryModel.create({
            amount: user.balance,
            belongsTo: user._id,
        });

        request.status = 'approved';
        await request.save();
        await user.save();
        return Promise.resolve(request);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function rejectRequest(requestId) {
    try {
        const request = await RequestModel.findOne({ _id: requestId });
        const user = await userModel.findUser({ _id: request.requestedBy });
        request.status = 'rejected';
        user.pendingBalance -= request.amount;
        await request.save();
        await user.save();
        return Promise.resolve(request);
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { newRequest, findRequests, approveRequest, rejectRequest };
