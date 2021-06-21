import userModel from "../../models/user.model";
import token from "../../utils/token";

async function signInController(req, res) {
  if (!req.body.username)
    return res.json({
      message: "please enter your username",
      success: false,
      data: null,
    });
  if (!req.body.password)
    return res.json({
      message: "please enter your password",
      success: false,
      data: null,
    });

  try {
    const user = await userModel.signIn(req.body);
    return res.json({
      message: "signed in",
      success: true,
      data: token.createToken({ _id: user._id }),
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "an error has occured",
      success: false,
      data: null,
    });
  }
}

export default signInController;
