import userModel from '../../models/user.model';
import randStr from '../../utils/randStr';
import mail from '../../utils/mail';
import dotenv from 'dotenv';
dotenv.config();

async function requestToken(req, res) {
    try {
        const resetToken = randStr(15);
        await userModel.setResetToken(req.body, {
            resetPasswordToken: resetToken,
        });

        const user = await userModel.findUser({ email: req.body.email });

        await mail.send_mailgun({
            receiver: user.email,
            subject: 'Your password reset token',
            html: resetToken,
        });

        return res.json({
            message: `an email has been sent to ${user.email} with a verification code.`,
            success: true,
            data: null,
        });
    } catch (err) {
        return res.json({
            message:
                'please check so you have entered the correct email of your account',
            success: false,
            data: null,
        });
    }
}

export default requestToken;
