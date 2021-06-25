import chatModel from '../models/chat.model';

let online = 0;

export default function (socket) {
    online++;

    socket.on('message new', (data) => {
        chatModel.sendMessage(data);
        socket.broadcast.emit(`message new ${data.id}`, data);
    });

    socket.on('chat new', (data) => {
        socket.broadcast.emit(`chat new sync`, data);
    });

    socket.on('chat end', (data) => {
        chatModel.endChat(data.id);
        socket.broadcast.emit(`chat end ${data.id}`, {
            message: 'chat ended'
        });
    });

    socket.on('disconnect', () => {
        online--;
        socket.broadcast.emit('broadcast online', online);
    });

    socket.broadcast.emit('broadcast online', online);
}
