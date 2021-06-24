import dotenv from 'dotenv';
import mailgun from 'mailgun-js';

dotenv.config();

async function send(settings) {
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

    console.log(settings);

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

export default { send };
