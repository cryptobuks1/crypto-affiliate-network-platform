import faker from 'faker/locale/en_US';
import database from './database';
import userModel from './models/user.model';
import requestsModel from './models/requests.model';
import fs from 'fs';

const users = [];
const hashes = JSON.parse(fs.readFileSync('txthashes.json'));
let usersAdded = 0;
let requestsAdded = 0;
let referralCode = 'AeJBwBiFlWQ54Uq';

/*
    duplication errors might occur due to txthashes.json 
    not containing enough unique indicies
*/

(async () => {
    await database.connect();
})();

async function addUsers(n) {
    try {
        for (let i = 0; i < n; i++) {
            if (users.length > 0) {
                referralCode =
                    users[Math.floor(Math.random() * users.length)]
                        .affiliateCode;
            }

            let data = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: 'password123',
                confirmPassword: 'password123',
                referralCode: referralCode,
                tos: true,
            };

            const newUser = await userModel.signUp(data, '::1');

            for (let i = 0; i < 5; i++) {
                requestsAdded++;
                await addRequest(newUser._id);
            }

            usersAdded++;
            users.push(newUser);
        }

        console.log('Users added', usersAdded);
        console.log('Requests added', requestsAdded);

        await database.disconnect();
    } catch (err) {
        console.log(err);
        console.log('Users added', usersAdded);
        console.log('Requests added', requestsAdded);
        await database.disconnect();
    }
}

async function addRequest(id) {
    const hash = hashes[Math.floor(Math.random() * hashes.length)];

    let data = {
        requestedBy: id,
        amount: Math.round(Math.random() * 100),
        proof: [
            'files-1624360745087.PNG',
            'files-1624355270023.PNG',
            'files-1624473820434.PNG',
        ],
        transactionHash: hash,
    };

    await requestsModel.newRequest(data);
}

addUsers(50);
