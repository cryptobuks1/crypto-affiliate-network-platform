import { Server } from 'socket.io';
import { server } from './server';
import dotenv from 'dotenv';
dotenv.config();

export const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_ADDR,
        methods: ['GET', 'POST'],
    },
});
