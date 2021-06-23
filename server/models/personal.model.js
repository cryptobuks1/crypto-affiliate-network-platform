import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const personalSchema = new Schema({
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    belongsTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: {
        type: String,
        default: null,
    },
    lastName: {
        type: String,
        default: null,
    },
    country: {
        type: String,
        default: null,
    },
    address: {
        type: String,
        default: null,
    },
    zipCode: {
        type: String,
        default: null,
    },
    city: {
        type: String,
        default: null,
    },
    state: {
        type: String,
        default: null,
    },
});

const PersonalModel = mongoose.model('Personal', personalSchema);

async function createPersonal(data) {
    try {
        return await new PersonalModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function getPersonal(id) {
    try {
        return await PersonalModel.findOne({ belongsTo: id });
    } catch (err) {
        return Promise.reject(err);
    }
}

async function updatePersonal(id, data) {
    try {
        return await PersonalModel.findOneAndUpdate({ belongsTo: id }, data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { createPersonal, updatePersonal, getPersonal };
