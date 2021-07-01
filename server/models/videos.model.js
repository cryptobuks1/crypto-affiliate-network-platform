import fs from 'fs';

async function setVideos(videos) {
    try {
        fs.writeFileSync('./store/videos.json', JSON.stringify(videos, null, 4));
        return Promise.resolve('wrote data');
    } catch (err) {
        console.log(err);
        return Promise.reject('caught error');
    }
}

async function getVideos() {
    try {
        let buffer = fs.readFileSync("./store/videos.json");
        return Promise.resolve(JSON.parse(buffer));
    } catch (err) {
        return Promise.reject('caught an error');
    }
}

export default { setVideos, getVideos };