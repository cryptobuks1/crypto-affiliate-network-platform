import userModel from '../../models/user.model';
import bcrypt from 'bcryptjs';

async function updatePassword(req, res) {
    if (!req.body.oldPassword)
        return res.json({
            message: 'please enter your old password',
            success: false,
            data: null,
        });

    if (!req.body.newPassword)
        return res.json({
            message: 'please enter your new password',
            success: false,
            data: null,
        });

    if (!req.body.confirmNewPassword)
        return res.json({
            message: 'please confirm your new password',
            success: false,
            data: null,
        });

    if (req.body.newPassword !== req.body.confirmNewPassword)
        return res.json({
            message: 'your passwords do not match',
            success: false,
            data: null,
        });

    try {
        const user = await userModel.findUser({ _id: req.session.uid }, true);
        console.log(user);

        if (user !== null) {
            const OK = bcrypt.compareSync(req.body.oldPassword, user.password);

            if (OK) {
                await userModel.updatePassword(
                    req.session.uid,
                    req.body.newPassword
                );
                return res.json({
                    message: 'your password has been updated',
                    success: true,
                    data: null,
                });
            }

            return res.json({
                message: 'password rejected',
                success: false,
                data: null,
            });
        }

        return res.json({
            message: 'session has expired',
            success: false,
            data: null,
        });
    } catch (err) {
        console.log(err);
    }
}

export default updatePassword;
