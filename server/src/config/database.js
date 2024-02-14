import { connect } from 'mongoose';
import { logger } from '../utils/logger.js';

async function databaseConnection() {
    try {
        await connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB_NAME });
        logger.info('DB Connected');
    } catch (error) {
        logger.error(error);
    }
}

export default databaseConnection;
