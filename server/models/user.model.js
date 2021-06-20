import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import randStr from '../utils/randStr';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    referralCode: {
        type: String,
        default: ''
    },
    affiliateCode: {
        type: String,
        required: true
    },
    tos: {
        type: Boolean,
        default: false
    }
});

const UserModel = mongoose.model('User', userSchema);

async function signUp(data) {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);

        return await new UserModel({
            username: data.username,
            password: hash,
            email: data.email,
            affiliateCode: randStr(15),
            referralCode: data.referralCode || 'empty',
            tos: data.tos || false
        }).save();

    } catch (err) {
        return Promise.reject('sign up failed');
    }
}

async function signIn(data) {
    try {
        const user = await UserModel.findOne({
            username: data.username
        });
        const OK = bcrypt.compareSync(data.password, user.password);

        if (!OK) {
            return Promise.reject('wrong password');
        }

        return Promise.resolve(user);

    } catch (err) {
        return Promise.reject('sign in failed');
    }
}

export default {
    signUp,
    signIn
};