import userModel from "../models/user.model";

async function isAdmin(req, res, next) {
  try {
    const user = await userModel.findUser({ _id: req.session.uid });
    if (user.administrator) return next();

    throw new Error("user not admin");
  } catch (err) {
    return res.json({
      message: "only administrator can perform that action",
      success: false,
      data: null,
    });
  }
}

export default isAdmin;
