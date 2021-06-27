import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import database from './database';
import { app, server } from './server';
import { io } from './sockets';

import index from './routers/index';
import users from './routers/users';
import admin from './routers/admin';
import stream from './routers/stream';

import extract from './middleware/extract';
import auth from './middleware/auth';
import isAdmin from './middleware/admin';

dotenv.config();
database.connect();
app.use(express.json());

app.use(cors());
app.use('/', express.static('./public'));
app.use('/uploads', express.static('./uploads'));
app.use('/api', extract, index);
app.use('/api/users', extract, auth, users);
app.use('/api/admin', extract, auth, isAdmin, admin);
io.on('connection', stream.connection);

server.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT} 👂`));
