import chatModel from '../models/chat.model';
import streamStore from '../store/stream.store';

function connection(socket) {
    streamStore.online++;

    socket.on('message new', (data) => {
        chatModel.sendMessage(data); // store messages in db
        socket.broadcast.emit(`message new ${data.id}`, data);
    });

    socket.on('chat new', (data) => {
        socket.broadcast.emit(`chat new sync`, data);
    });

    socket.on('chat end', (data) => {
        chatModel.endChat(data.id); // update db
        socket.broadcast.emit(`chat end ${data.id}`, {
            message: 'chat ended'
        });
    });

    socket.on('disconnect', () => {
        streamStore.online--;
        socket.broadcast.emit('broadcast online', streamStore.online);
    });

    socket.broadcast.emit('broadcast online', streamStore.online);
}

export default { connection };