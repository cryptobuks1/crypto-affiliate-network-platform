import userModel from '../../models/user.model';
import mail from '../../utils/mail';
import dotenv from 'dotenv';
import validators from '../../utils/validators';

dotenv.config();

async function inviteFriend(req, res) {
    if (!req.body.email)
        return res.json({
            message: 'please include an email',
            success: false,
            data: null,
        });

    if (!validators.emailValidator(req.body.email))
        return res.json({
            message: 'is that a real email?',
            success: false,
            data: null
        });

    try {
        const user = await userModel.findUser({ _id: req.session.uid });
        const href = `${process.env.CLIENT_ADDR}/register/?ref=${user.affiliateCode}`;

        await mail.send_gmail({
            receiver: req.body.email,
            subject: 'You have been invited to try...',
            html: `<a href="${href}">Accept Invitation</a>`,
        });
        return res.json({
            message: 'your friend has been invited',
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

export default inviteFriend;
