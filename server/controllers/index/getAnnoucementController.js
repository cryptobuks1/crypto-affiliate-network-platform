import announcementModel from "../../models/announcement.model";

async function getAnnoucement(req, res) {
    try {
        const announcements = await announcementModel.getAnnouncements();
        return res.json({
            message: '',
            success: true,
            data: announcements[announcements.length - 1]
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