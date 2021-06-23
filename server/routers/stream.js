import { io } from '../sockets';
import chatModel from '../models/chat.model';

export default function (socket) {
    socket.on('message new', (data) => {
        chatModel.sendMessage(data);
        socket.broadcast.emit(`message new ${data.id}`, data);
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
    });
}
