import chatModel from '../../models/chat.model';

async function getChats(req, res) {
    try {
        const chats = await chatModel.findChats({ ended: false });
        return res.json({
            message: `found ${chats.length} chats`,
            success: true,
            data: chats,
        });

    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null,
        });
    }
}

export default getChats;
