// Import the 'express' module
import express, {Application,Request,Response,NextFunction} from 'express';
// Create an Express application
const app:Application = express();
app.use(express.json())
import cors from 'cors';
app.use(cors())
// Set the port number for the server
import env_config from './app/config/env_config'
import logger from './app/helper/logger';
const port:number = 3500??env_config.PORT

console.log()
import {DB_connection} from './app/config/db_config'
DB_connection()

import routes from './app/routes';
import config from './app/config/env_config';
app.use('/api/',routes)
// Define a route for the root path ('/')
// Middleware to log incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info({ req }, 'Incoming request');
  next();
});
app.get('/', (req:Request, res:Response) => {
  // Send a response to the client 
  res.send('Hello, TypeScript + Node.js + Express!');
})

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error({ err }, 'Error occurred');
  res.status(500).send('Something Went Wrong!');
});
// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  // console.log(`Server is running on http://localhost:${port}`);
  logger.info(`Server is running on http://localhost:${port}`)
  logger.info('Application started');
  logger.debug('Debugging info');
  logger.warn('This is a warning');
  logger.error('An error occurred');

});
 
