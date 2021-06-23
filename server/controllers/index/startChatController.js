import chatModel from '../../models/chat.model';

async function startChat(req, res) {
    if (!req.body.fullName)
        return res.json({
            message: 'please enter your name',
            success: false,
            data: null,
        });
    if (!req.body.email)
        return res.json({
            message: 'please include your email',
            success: false,
            data: null,
        });
    if (!req.body.description)
        return res.json({
            message: 'please describe your porblem',
            success: false,
            data: null,
        });

    let userId = null;

    if (req.session !== undefined && req.session.uid !== undefined) {
        userId = req.session.uid;
    }

    try {
        const newChat = await chatModel.startChat({
            description: req.body.description,
            startedBy: {
                userId: userId,
                email: req.body.email,
                fullName: req.body.fullName,
            },
        });

        return res.json({
            message: 'chat started',
            success: true,
            data: newChat,
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

export default startChat;
