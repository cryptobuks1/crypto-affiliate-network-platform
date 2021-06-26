import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const loginHistorySchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    belongsTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ipAddr: { type: String, required: true },
    success: { type: Boolean, required: true }
});

const LoginHistoryModel = mongoose.model('LoginHistory', loginHistorySchema);

async function create(data) {
    try {
        return await new LoginHistoryModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function getMyHistory(id) {
    try {
        return await LoginHistoryModel.find({ belongsTo: id });
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { create, getMyHistory };
