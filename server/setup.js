import http from 'http';
import express from 'express';
import cors from 'cors';
import compression from 'compression';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(compression());
app.use('/', express.static('./public'));
app.use('/uploads', express.static('./uploads'));

export default { app, server };