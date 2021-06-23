import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import connect from './database';

dotenv.config();
connect();
const app = express();
const server = http.createServer(app);

app.use(express.json());

import index from './routers/index';
import users from './routers/users';
import admin from './routers/admin';

import auth from './middleware/auth';
import isAdmin from './middleware/admin';

app.use(cors());
app.use('/uploads', express.static('./uploads'));
app.use('/api', index);
app.use('/api/users', auth, users);
app.use('/api/admin', auth, isAdmin, admin);

server.listen(process.env.PORT, () =>
    console.log(`Server listening on ${process.env.PORT}`)
);
