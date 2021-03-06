import announcementModel from "../../models/announcement.model";

async function getAnnoucement(req, res) {
    try {
        const announcement = await announcementModel.getActiveAnnouncement();
        return res.json({
            message: '',
            success: true,
            data: announcement
        });
    } catch (err) {
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null
        });
    }
}

export default getAnnoucement;