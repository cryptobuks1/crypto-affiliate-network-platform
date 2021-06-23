import userModel from '../../models/user.model';

async function updatePassword(req, res) {
    if (!req.body.resetCode)
        return res.json({
            message: 'please enter the token you received in your email inbox',
            success: false,
            data: null,
        });
    if (!req.body.password)
        return res.json({
            message: "you can't have an empty password",
            success: false,
            data: null,
        });
    if (!req.body.confirmPassword)
        return res.json({
            message: 'please confirm your new password',
            success: false,
            data: null,
        });
    if (req.body.password != req.body.confirmPassword)
        return res.json({
            message: 'please enter matching password',
            success: false,
            data: null,
        });

    try {
        const user = await userModel.findUser({
            resetPasswordToken: req.body.resetCode,
        });

        if (user != null) {
            await userModel.updatePassword(user._id, req.body.password);
            return res.json({
                message: 'your password has been updated',
                success: true,
                data: null,
            });
        } else {
            throw new Error('invalid code');
        }
    } catch (err) {
        return res.json({
            message: 'the code you have entered is invalid',
            success: false,
            data: null,
        });
    }
}

export default updatePassword;
