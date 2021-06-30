import mongoose from 'mongoose';
import userModel from './user.model';
import io from '../sockets';

const Schema = mongoose.Schema;

const withdrawalSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    belongsTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    asset: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    walletAddr: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const WithdrawalModel = mongoose.model('Withdrawal', withdrawalSchema);

async function requestWithdrawal(data) {
    try {
        const user = await userModel.findUser({ _id: data.belongsTo });

        if (user.balance >= data.amount) {
            user.balance -= data.amount;
            await user.save();
            return new WithdrawalModel(data).save();
        } else {
            return Promise.reject('balance too low');
        }

    } catch (err) {
        return Promise.reject('something went wrong');
    }
}

async function approveWithdrawal(id) {
    try {
        const result = await WithdrawalModel.findOneAndUpdate({ _id: id }, {
            status: 'approved',
            completed: true
        });
        io.emit(`update ${result.belongsTo}`, 'your withdrawal has been approved');
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function rejectWithdrawal(id) {
    try {
        const withdrawal = await WithdrawalModel.findOneAndUpdate({ _id: id }, {
            status: 'rejected',
            completed: true
        });

        const user = await userModel.findUser({ _id: withdrawal.belongsTo });
        user.balance += withdrawal.amount;
        io.emit(`update ${user._id}`, 'your withdrawal has been rejected');
        return await user.save();
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

async function cancelWithdrawal(id, uid) {
    try {
        const user = await userModel.findUser({ _id: uid });
        const withdrawal = await WithdrawalModel.findOneAndRemove({ _id: id });

        if (withdrawal.completed) {
            return Promise.reject('withdrawal is completed');
        }

        user.balance += withdrawal.amount;
        io.emit(`update ${user._id}`, 'your withdrawal has been canceled');
        await user.save();
        return await withdrawal.remove();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function getWithdrawals(filter) {
    try {
        return await WithdrawalModel.find(filter).populate({ path: 'belongsTo', model: 'User' });
    } catch (err) {
        return Promise.reject(err);
    }
}

export default {
    requestWithdrawal,
    getWithdrawals,
    cancelWithdrawal,
    approveWithdrawal,
    rejectWithdrawal
};