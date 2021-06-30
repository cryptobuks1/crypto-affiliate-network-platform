import { Server } from 'socket.io';
import setup from './setup';
import dotenv from 'dotenv';
dotenv.config();

const io = new Server(setup.server, {
    cors: {
        origin: process.env.CLIENT_ADDR,
        methods: ['GET', 'POST'],
    }
});

export default io;
