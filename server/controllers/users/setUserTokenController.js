import userModel from '../../models/user.model';
import randStr from '../../utils/randStr';
import mail from '../../utils/mail';

async function setUserToken(req, res) {
    try {
        let token = randStr(6);
        const user = await userModel.findUser({ _id: req.session.uid });

        user.token = token;
        await user.save();
        await mail.send_mailgun({
            receiver: user.email,
            subject: `Your token is: ${token}`,
            html: `<p>${token}</p>`,
        });

        return res.json({
            message: `an email has been sent to ${user.email} with a code`,
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

export default setUserToken;
