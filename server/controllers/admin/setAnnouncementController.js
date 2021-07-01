import announcementsModel from '../../models/announcement.model';

async function setAnnouncement(req, res) {
    if (!req.body.text) return res.json({
        message: 'please enter some text',
        success: false,
        data: null
    });

    if (!req.body.backgroundColor) return res.json({
        message: 'please set a background color',
        success: false,
        data: null
    });

    if (!req.body.textColor) return res.json({
        message: 'please set a text color',
        success: false,
        data: null
    });

    try {
        await announcementsModel.setAnnouncement(req.body);
        return res.json({
            message: 'announcement updated',
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

export default setAnnouncement;