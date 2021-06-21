import mongoose from "mongoose";
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
  transactionHash: { type: String, required: true, unique: true },
  requestedBy: { type: Schema.Types.ObjectId, ref: "User" },
  proof: { type: Array, required: true },
  amount: { type: Number, required: true, min: 1 },
});

const RequestModel = mongoose.model("Request", requestSchema);

async function newRequest(data) {
  try {
    return await new RequestModel(data).save();
  } catch (err) {
    return Promise.reject(err);
  }
}

export default { newRequest };
