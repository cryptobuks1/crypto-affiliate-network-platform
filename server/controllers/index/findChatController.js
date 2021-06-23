import chatModel from '../../models/chat.model';

async function findChat(req, res) {
    try {
        const chat = await chatModel.findChat({ _id: req.params.chatId });

        return res.json({
            message: 'found chat',
            success: true,
            data: chat,
        });
    } catch (err) {
        console.log(err);

        return res.json({
            message: 'something went wrong',
            success: false,
            data: null,
        });
    }
}

export default findChat;
