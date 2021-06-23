import userModel from '../../models/user.model';
import bcrypt from 'bcryptjs';

async function updateEmail(req, res) {
    if (!req.body.password)
        return res.json({
            message: 'missing password',
            success: false,
            data: null,
        });
    if (!req.body.newEmail)
        return res.json({
            message: 'missing new email',
            success: false,
            data: null,
        });
    if (!req.body.confirmNewEmail)
        return res.json({
            message: 'please confirm new email',
            success: false,
            data: null,
        });
    if (req.body.newEmail !== req.body.confirmNewEmail)
        return res.json({
            message: 'emails must match',
            success: false,
            data: null,
        });

    try {
        const user = await userModel.findUser({ _id: req.session.uid }, true);

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.json({
                message: 'wrong password',
                success: false,
                data: null,
            });
        }

        user.email = req.body.newEmail;
        user.emailVerified = false;
        await user.save();
        return res.json({
            message: 'your email has been updated',
            success: true,
            data: null,
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null,
        });
    }
}

export default updateEmail;
