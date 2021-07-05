import fs from 'fs';


async function setAnnouncement(newData) {
    try {
        let data = JSON.parse(fs.readFileSync('./store/announcements.json'));

        data.store.unshift(data.active);
        data.active = newData;

        fs.writeFileSync('./store/announcements.json', JSON.stringify(data, null, 4));
        return Promise.resolve('announcement updated');
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function getAnnouncements() {
    try {
        let data = JSON.parse(fs.readFileSync('./store/announcements.json'));
        return data;
    } catch (err) {
        return Promise.reject(err);
    }
}

async function getActiveAnnouncement() {
    try {
        let data = JSON.parse(fs.readFileSync('./store/announcements.json'));
        return data.active;
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { setAnnouncement, getAnnouncements, getActiveAnnouncement };