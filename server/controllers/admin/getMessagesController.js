import contactModel from "../../models/contact.model";

async function getMessages(req, res) {
    try {
        const messages = await contactModel.getMessages();
        return res.json({
            message: `found ${messages.length} messages`,
            success: true,
            data: messages
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

export default getMessages;