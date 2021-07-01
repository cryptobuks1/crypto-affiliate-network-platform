import fs from 'fs';


async function setAnnouncement(data) {
    try {
        const announcements = await getAnnouncements();
        announcements.push(data);
        fs.writeFileSync('./store/announcements.json', JSON.stringify(announcements, null, 4));
        return Promise.resolve('announcement updated');
    } catch (err) {
        console.log(err);
        return Promise.reject('caught error');
    }
}

async function getAnnouncements() {
    try {
        let buffer = fs.readFileSync('./store/announcements.json');
        return Promise.resolve(JSON.parse(buffer));
    } catch (err) {
        return Promise.reject('caught error');
    }
}

export default { setAnnouncement, getAnnouncements };