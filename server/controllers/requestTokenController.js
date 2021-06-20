import userModel from "../models/user.model";
import randStr from '../utils/randStr';

async function requestToken(req, res) {
    try {
        const resetToken = randStr(8);
        await userModel.setResetToken(req.body, { resetPasswordToken: resetToken });
        return res.json({
            message: `an email has been sent to ${req.body.email} with a verification code.`,
            success: true,
            data: null
        });
    } catch (err) {

        return res.json({
            message: 'please check so you have entered the correct email of your account',
            success: false,
            data: null
        });
    }
}

export default requestToken;