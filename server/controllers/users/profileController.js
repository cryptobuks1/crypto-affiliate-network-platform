import userModel from "../../models/user.model";

async function profileController(req, res) {
  return res.json({
    message: "Profile",
    success: true,
    data: await userModel.findUser({ _id: req.session.uid }),
  });
}

export default profileController;
