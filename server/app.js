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
import auth from './middleware/auth';

app.use(cors());
app.use('/api', index);
app.use('/api/users', auth, users);

server.listen(process.env.PORT, () =>
    console.log(`Server listening on ${process.env.PORT}`));