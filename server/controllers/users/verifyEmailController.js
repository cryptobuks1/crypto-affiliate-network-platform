import userModel from '../../models/user.model';

async function verifyEmail(req, res) {
    console.log(req.body.token);
    try {
        const user = await userModel.findUser({ _id: req.session.uid });

        if (user.token !== req.body.token) {
            return res.json({
                message: 'token not valid',
                success: false,
                data: null,
            });
        }

        user.token = null;
        user.emailVerified = true;
        await user.save();

        return res.json({
            message: 'your email has been verified',
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

export default verifyEmail;
