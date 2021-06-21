import mongoose from "mongoose";
import userModel from "./user.model";
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
  transactionHash: { type: String, required: true, unique: true },
  requestedBy: { type: Schema.Types.ObjectId, ref: "User" },
  proof: { type: Array, required: true },
  amount: { type: Number, required: true, min: 1 },
});

const RequestModel = mongoose.model("Request", requestSchema);

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
      .populate({ path: "requestedBy", model: "User", select: { password: 0 } })
      .exec();
  } catch (err) {
    return Promise.reject(err);
  }
}

export default { newRequest, findRequests };
