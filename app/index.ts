import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import Logger from 'jet-logger';
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';
import { routerFiles } from '@routers/files';
import { routerHardware } from '@routers/hardware';
import connect from '@config/db';

// cheking env file
const config = dotenv.config();
if (config.error) Logger.err('Missing environment variables');

// Global variables
declare global {
  var __basedir: string;
}
global.__basedir = __dirname;

// init DB
connect(`${process.env.DB_URI}`);

// Init Server
const app = express();
const port = process.env.PORT;

// Base middlewares
app.use(helmet());
const accessLogStream = createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})
app.use(morgan('combined', { stream: accessLogStream }))

// Cors and JSON
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') }));
app.use(express.json());

// Routes
app.use( routerFiles );
app.use( routerHardware );

// Static files
app.use('/', express.static('public'));

// Listen Server
app.listen(port, () => {
  Logger.info(`Server running and listening on port ${port}`);
});

