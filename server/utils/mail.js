import dotenv from 'dotenv';
import mailgun from 'mailgun-js';
import nodemailer from 'nodemailer';
dotenv.config();


async function send_gmail(settings) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_EMAIL, // generated ethereal user
            pass: process.env.GMAIL_PW, // generated ethereal password
        },
    });

    return await transporter.sendMail({
        from: `BNBG <${process.env.GMAIL_EMAIL}>`, // sender address
        to: settings.receiver, // list of receivers
        subject: settings.subject, // Subject line
        text: "", // plain text body
        html: settings.html, // html body
    });
}

async function send_mailgun(settings) {
    const auth = {
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    };

    const data = {
        from: 'noreply <me@samples.mailgun.org>',
        to: settings.receiver,
        subject: settings.subject,
        text: '',
        html: settings.html,
    };

    return new Promise((resolve, reject) => {
        mailgun(auth)
            .messages()
            .send(data, (err, body) => {
                if (err) {
                    return reject(err);
                }

                return resolve(body);
            });
    });
}

export default { send_mailgun, send_gmail };
