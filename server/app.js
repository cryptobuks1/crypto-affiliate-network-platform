import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import database from './database';
import { app, server } from './server';
import { io } from './sockets';

dotenv.config();
database.connect();
app.use(express.json());

import index from './routers/index';
import users from './routers/users';
import admin from './routers/admin';
import stream from './routers/stream';

import extract from './middleware/extract';
import auth from './middleware/auth';
import isAdmin from './middleware/admin';

app.use(cors());
app.use('/uploads', express.static('./uploads'));
app.use('/api', extract, index);
app.use('/api/users', extract, auth, users);
app.use('/api/admin', extract, auth, isAdmin, admin);
io.on('connection', stream);

server.listen(process.env.PORT, () =>
    console.log(`Server listening on ${process.env.PORT} 👂`)
);
