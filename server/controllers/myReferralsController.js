import userModel from "../models/user.model";

async function myReferrals(req, res) {
  try {
    const user = await userModel.findUser({ _id: req.session.uid });
    const referrals = await userModel.findUsers({
      referralCode: user.affiliateCode,
    });
    return res.json({
      message: `found ${referrals.length} referrals`,
      success: true,
      data: referrals,
    });
  } catch (err) {
    return res.json({
      message: "something has gone wrong",
      success: false,
      data: null,
    });
  }
}

export default myReferrals;
