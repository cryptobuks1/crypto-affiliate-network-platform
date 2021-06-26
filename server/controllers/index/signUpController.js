import validators from '../../utils/validators';
import userModel from '../../models/user.model';
import token from '../../utils/token';

async function signUpController(req, res) {
    if (!req.body.username)
        return res.json({
            message: 'please enter a username',
            success: false,
            data: null,
        });
    if (!req.body.password)
        return res.json({
            message: 'please enter a password',
            success: false,
            data: null,
        });
    if (!req.body.confirmPassword)
        return res.json({
            message: 'please confirm your password',
            success: false,
            data: null,
        });
    if (!req.body.email)
        return res.json({
            message: 'please enter an email',
            success: false,
            data: null,
        });
    if (req.body.password !== req.body.confirmPassword)
        return res.json({
            message: 'password do not match',
            success: false,
            data: null,
        });
    if (!validators.emailValidator(req.body.email))
        return res.json({
            message: 'please enter a real email',
            success: false,
            data: null,
        });
    if (!req.body.tos)
        return res.json({
            message:
                'you must agree to the terms and conditions in order to sign up',
            success: false,
            data: null,
        });

    try {
        const newUser = await userModel.signUp(
            req.body,
            req.body.ipAddr || (req.headers['x-forwarded-for'] || req.connection.remoteAddress)
        );

        return res.json({
            message: 'account created',
            success: true,
            data: token.createToken({ _id: newUser._id }),
        });
    } catch (err) {
        return res.json({
            message: err,
            success: false,
            data: null,
        });
    }
}

export default signUpController;
