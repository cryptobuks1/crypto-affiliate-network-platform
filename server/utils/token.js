import jwt from 'jsonwebtoken';
import fs from 'fs';

function createToken(data) {
    const key = fs.readFileSync('./utils/key.pem');

    return jwt.sign({
        data: data,
        exp: Math.floor(Date.now() / 1000) + (60 * 24)
    }, key, { algorithm: 'RS256' });
}

function validateToken(token) {
    const cert = fs.readFileSync('./utils/cert.pem');

    return jwt.verify(token, cert);
}


export default { createToken, validateToken };