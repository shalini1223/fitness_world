import mongoose from 'mongoose';
import {logger} from '../util/logger/logger.js';

export default function connectDB() {
    if(mongoose.connection.readyState >= 1){
        return;
    }
    mongoose.connect(process.env.MONGOURI);
    const db = mongoose.connection;
    db.on('error', (error) =>{
        logger.error('Error connecting to DB:',error);
    });
    db.once('open', () =>{
        logger.info('Connected to database');
    });
}