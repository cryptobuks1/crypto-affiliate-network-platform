import userModel from '../../models/user.model';
import token from '../../utils/token';
import hcaptcha from 'hcaptcha';
import dotenv from 'dotenv';
dotenv.config();


async function signInController(req, res) {
    const validated = await hcaptcha.verify(process.env.H_CAPTCHA_KEY, '4e2710e3-56db-4a6b-a003-faf95aa73f61');
    console.log(validated);

    if (!req.body.username)
        return res.json({
            message: 'please enter your username',
            success: false,
            data: null,
        });
    if (!req.body.password)
        return res.json({
            message: 'please enter your password',
            success: false,
            data: null,
        });

    try {
        const user = await userModel.signIn(
            req.body,
            req.body.ipAddr || (req.headers['x-forwarded-for'] || req.connection.remoteAddress)
        );
        return res.json({
            message: 'signed in',
            success: true,
            data: token.createToken({ _id: user._id }, req.body.keepMeLoggedIn ? true : false),
        });
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null,
        });
    }
}

export default signInController;
