import announcementModel from "../../models/announcement.model";

async function getAnnouncements(req, res) {
    try {
        let announcements = await announcementModel.getAnnouncements();
        return res.json({
            message: `found something`,
            success: true,
            data: announcements
        });
    } catch (err) {
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null
        });
    }
}

export default getAnnouncements;