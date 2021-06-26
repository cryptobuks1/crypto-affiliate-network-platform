import contactModel from "../../models/contact.model";

async function updateMessage(req, res) {
    try {
        const updated = await contactModel.updateMessage({ _id: req.body.id }, req.body.update);
        return res.json({
            message: 'updated message',
            success: true,
            data: updated
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

export default updateMessage;