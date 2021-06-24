import { io } from '../sockets';
import chatModel from '../models/chat.model';

export default function (socket) {
    socket.on('message new', (data) => {
        chatModel.sendMessage(data);
        socket.broadcast.emit(`message new ${data.id}`, data);
    });

    socket.on('chat new', (data) => {
        socket.broadcast.emit(`chat new sync`, data);
    });

    socket.on('chat end', (data) => {
        console.log(data);
        chatModel.endChat(data.id);
        socket.broadcast.emit(`chat end ${data.id}`, {});
    });

    // socket.on('disconnect', () => {
    //     console.log('disconnect');
    // });
}
