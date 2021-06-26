import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

async function verify(req, res) {
    if (!req.body.response) return res.json({
        message: 'missing response token',
        success: false,
        data: null
    });

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            body: `secret=${process.env.RECAPTCHA_SECRET}&response=${req.body.response}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const result = await response.json();
        return res.json({
            message: '',
            success: result.success,
            data: null
        });

    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

export default verify;