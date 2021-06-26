import contactModel from "../../models/contact.model";

async function contact(req, res) {
    if (!req.body.name) return res.json({
        message: 'missing name',
        success: false,
        data: null
    });

    if (!req.body.email) return res.json({
        message: 'missing email',
        success: false,
        data: null
    });

    if (!req.body.message) return res.json({
        message: 'missing message',
        success: false,
        data: null
    });

    try {
        await contactModel.contact(req.body);
        return res.json({
            message: 'your message has been received',
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

export default contact;