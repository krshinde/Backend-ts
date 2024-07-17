import mongoose from 'mongoose'
import env_config from './env_config'
import logger from '../helper/logger'
export const DB_connection  = async ()=>{
    try {
        mongoose.connect(env_config.MONGOURI)
        mongoose.connection.on('connected', () => logger.info('Database connected!'));
        mongoose.connection.on('connecting', () => logger.info('Connecting to database...'));
        mongoose.connection.on('open', () => logger.info('Connection opened!'));
        mongoose.connection.on('disconnected', () => logger.info('Database disconnected!'));
        mongoose.connection.on('reconnected', () => logger.info('Database reconnected!'));
        mongoose.connection.on('disconnecting', () => logger.info('Disconnecting from database...'));
        mongoose.connection.on('close', () => logger.info('Connection closed!'));
        mongoose.connection.on('error', (error) => logger.info(`Database error: ${error}`));
        logger.info('Connection established successfully.');
    } catch (error) {
        logger.error(error,"Db Error")
    }
}


// 144
// 63
// 26
// 178
// 170
// 129
// 128
// 77