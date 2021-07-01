import videosModel from '../../models/videos.model';

async function getVideos(req, res) {
    try {
        const videos = await videosModel.getVideos();
        return res.json({
            message: `found ${videos.length} videos`,
            success: true,
            data: videos
        });
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null
        });
    }
}

export default getVideos;