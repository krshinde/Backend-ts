import logger from 'pino';
import dayjs from 'dayjs';
import rfs from 'rotating-file-stream';
import fs from 'fs';
import {Request,Response} from 'express';

const isProduction = process.env.NODE_ENV === 'production';

const customSerializers = {
    req: (req:Request) => {
        return {
            method: req.method,
            url: req.url,
            // headers: req.headers,
            query: (req as any).query,
            params: (req as any).params,
            body: (req as any).body,
        };
    },
    res: (res: Response) => {
        return {
            statusCode: res.statusCode,
        };
    },
    err: (err: any) => {
        return {
            type: err.name,
            message: err.message,
            stack: err.stack,
        };
    },
};


const transport = logger.transport({
    targets: [
        {
            target: 'pino/file',
            options: { destination: 'app.log' },
        },
        // {
        //     target: 'pino-rotating-file-stream',
        //     options: {
        //         interval: '1d', // Rotate daily
        //         size: '10M',    // Rotate when file size reaches 0MB
        //         path: 'app-rotated.log',
        //     },
        // },
    ],
});

const log = logger(
    {    
        level: isProduction ? 'info' : 'debug',
        serializers: customSerializers,
        timestamp: ()=> `Time : "${dayjs().format()}"`,
        base:{pid:false},
        transport: !isProduction ? {
            target: 'pino-pretty',
            options: {
                colorize:true,
            },
        }:transport
    }
    
)

export default log