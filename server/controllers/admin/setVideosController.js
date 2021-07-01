import videosModel from '../../models/videos.model';

async function setVideos(req, res) {
    console.log(req.body);

    if (!req.body.videos || req.body.videos.length <= 0) return res.json({
        message: 'please include at least one video',
        success: false,
        data: null
    });

    try {
        await videosModel.setVideos(req.body.videos);
        return res.json({
            message: 'videos have been updated',
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null
        });
    }
}

export default setVideos;