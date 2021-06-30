import dotenv from 'dotenv';
import database from './database';
import setup from './setup';
import io from './sockets';

// routers
import index from './routers/index';
import users from './routers/users';
import admin from './routers/admin';
import stream from './routers/stream';

// middlewares
import extract from './middleware/extract';
import auth from './middleware/auth';
import isAdmin from './middleware/admin';

const { app, server } = setup;

dotenv.config();
database.connect();

app.use('/api', extract, index);
app.use('/api/users', extract, auth, users);
app.use('/api/admin', extract, auth, isAdmin, admin);

io.on('connection', stream.connection);

server.listen(process.env.PORT, () =>
    console.log(`Server listening on ${process.env.PORT} 👂`));
