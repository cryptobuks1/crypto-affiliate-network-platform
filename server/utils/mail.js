import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

async function send(settings) {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_ADDR,
                pass: process.env.EMAIL_PW,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: settings.receiver,
            subject: settings.subject,
            // text: "something went wrong",
            html: settings.html,
        });
    } catch (err) {
        Promise.reject(err);
    }
}

export default { send };
