import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
};

async function connect() {
    try {
        await mongoose.connect(process.env.DB_URI, mongooseOptions);
        console.log('MongoDB has connected');
    } catch (err) {
        console.log(err);
    }
}

export default connect;
