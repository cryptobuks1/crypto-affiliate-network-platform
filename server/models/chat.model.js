import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    description: { type: String, required: true },
    ended: { type: Boolean, default: false },
    startedBy: { type: Object, required: true },
    participants: { type: Array, default: [] },
    messages: { type: Array, default: [] }
});

const ChatModel = mongoose.model('Chat', chatSchema);

async function startChat(data) {
    try {
        return await new ChatModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findChat(filter) {
    try {
        return await ChatModel.findOne(filter);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findChats(filter) {
    try {
        return await ChatModel.find(filter);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function sendMessage(data) {
    try {
        data.createdAt = new Date();
        const chat = await ChatModel.findOne({ _id: data.id });
        delete data.id;
        chat.messages.push(data);
        chat.updatedAt = new Date();
        return await chat.save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function endChat(id) {
    try {
        return await ChatModel.findOneAndUpdate({ _id: id }, {
            ended: true,
            updatedAt: new Date()
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { startChat, findChat, findChats, sendMessage, endChat };
