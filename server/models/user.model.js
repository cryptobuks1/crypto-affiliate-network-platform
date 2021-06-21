import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import randStr from "../utils/randStr";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  balance: {
    type: Number,
    default: 0,
  },
  administrator: {
    type: Boolean,
    default: false,
  },
  pendingBalance: {
    type: Number,
    default: 0,
  },
  referralCode: {
    // who was the user referred by
    type: String,
    default: null,
  },
  affiliateCode: {
    // the code users will sign up with to give this user a percentage
    type: String,
    required: true,
  },
  tos: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  referrals: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const UserModel = mongoose.model("User", userSchema);

async function signUp(data) {
  console.log(data);
  if (
    data.referralCode != undefined ||
    (data.referralCode != null && data.referralCode.length > 0)
  ) {
    const referer = await UserModel.findOne({
      affiliateCode: data.referralCode,
    });

    try {
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

      if (referer != null) {
        referer.referrals.push(user._id);
        await referer.save();
      }

      return Promise.resolve(user);
    } catch (err) {
      return Promise.reject("sign up failed");
    }
  }

  return Promise.reject("hang tight...");
}

async function signIn(data) {
  try {
    const user = await UserModel.findOne({
      username: data.username,
    });
    const OK = bcrypt.compareSync(data.password, user.password);

    if (!OK) {
      return Promise.reject("wrong password");
    }

    return Promise.resolve(user);
  } catch (err) {
    return Promise.reject("sign in failed");
  }
}

async function findUser(filter) {
  try {
    return UserModel.findOne(filter).select({ password: 0 }).exec();
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
    return await UserModel.findOneAndUpdate(id, update);
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
};
