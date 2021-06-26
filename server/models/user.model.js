import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import randStr from '../utils/randStr';
import loginHistoryModel from './loginHistory.model';
import personalModel from './personal.model';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    username: { type: String, required: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    identityVerified: { type: Boolean, default: false },
    email: { type: String, required: true },
    balance: { type: Number, default: 0 },
    administrator: { type: Boolean, default: false },
    pendingBalance: { type: Number, default: 0 },
    percentage: { type: Number, default: 1 },
    referralCode: { type: String, default: null },
    affiliateCode: { type: String, required: true, unique: true },
    tos: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: null },
    token: { type: String, default: null },
    referrals: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const UserModel = mongoose.model('User', userSchema);

async function signUp(data, ipAddr) {
    try {
        let referer = null;
        const referralCodeExists =
            data.referralCode !== null &&
            data.referralCode !== undefined &&
            data.referralCode.length > 0;
        if (referralCodeExists) {
            try {
                referer = await UserModel.findOne({
                    affiliateCode: data.referralCode,
                });
            } catch (err) {
                console.log(err);
            }
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);

        const user = await new UserModel({
            username: data.username,
            password: hash,
            email: data.email,
            affiliateCode: randStr(15),
            referralCode: data.referralCode || null,
            tos: data.tos || false,
        }).save();

        if (referer !== null) {
            referer.referrals.push(user._id);
            await referer.save();
        }

        await personalModel.createPersonal({ belongsTo: user._id });
        await loginHistoryModel.create({
            belongsTo: user._id,
            success: true,
            ipAddr: ipAddr,
        });
        return Promise.resolve(user);
    } catch (err) {
        console.log(err);
        return Promise.reject('sign up failed');
    }
}

async function signIn(data, ipAddr) {
    try {
        const user = await UserModel.findOne({
            username: data.username,
        });
        const OK = bcrypt.compareSync(data.password, user.password);

        if (!OK) {
            await loginHistoryModel.create({
                belongsTo: user._id,
                success: false,
                ipAddr: ipAddr,
            });
            return Promise.reject('wrong password');
        }

        await loginHistoryModel.create({
            belongsTo: user._id,
            success: true,
            ipAddr: ipAddr,
        });
        return Promise.resolve(user);
    } catch (err) {
        return Promise.reject('sign in failed');
    }
}

async function findUser(filter, includePW) {
    try {
        if (!includePW) {
            return UserModel.findOne(filter).select({ password: 0 }).exec();
        }
        return UserModel.findOne(filter);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findUsers(filter) {
    try {
        return UserModel.find(filter).select({ password: 0 }).exec();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function setResetToken(filter, update) {
    try {
        const user = await UserModel.findOne(filter);
        user.resetPasswordToken = update.resetPasswordToken;
        return await user.save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function updatePassword(id, password) {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = await UserModel.findOne({ _id: id });
        user.lastUpdated = new Date();
        user.password = hash;
        user.resetPasswordToken = null;
        return await user.save();
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

async function updateUser(id, update) {
    try {
        return await UserModel.findOneAndUpdate({ _id: id }, {
            ...update,
            lastUpdated: new Date()
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

async function updateReferralCodes(oldCode, newCode) {
    try {
        await UserModel.updateMany(
            { referralCode: oldCod },
            { referralCode: newCode, lastUpdated: new Date() }
        );
        return Promise.resolve('updated!');
    } catch (err) {
        return Promise.reject(err);
    }
}

export default {
    signUp,
    signIn,
    findUser,
    setResetToken,
    updatePassword,
    updateUser,
    findUsers,
    updateReferralCodes,
};
