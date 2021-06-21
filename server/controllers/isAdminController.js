import userModel from "../models/user.model";

async function isAdmin(req, res) {
  try {
    const user = await userModel.findUser({ _id: req.session.uid });
    return res.json({
      message: "",
      success: true,
      data: user.administrator,
    });
  } catch (err) {
    return res.json({
      message: "something went wrong",
      success: false,
      data: null,
    });
  }
}

export default isAdmin;
