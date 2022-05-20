import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import https from 'https';
import compression from 'compression';
import Logger from 'jet-logger';
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';
import { routerFiles } from '@routers/files';
import { routerHardware } from '@routers/hardware';
import { redirectWwwTraffic } from '@middlewares/redirectWwwTraffic';
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

// some configs
const shouldCompress = (req: Request, res: Response) => {
  if (req.headers['x-no-compression']) return false
  return compression.filter(req, res)
}

// set up plain http server
const http = express();
http.get('*', (req, res) => {
  res.redirect('https://' + req.headers.host + req.url);
})
http.use(compression({ filter: shouldCompress }))
http.use(redirectWwwTraffic);
http.listen(80, () => {
  console.log('Init server without SSL, por 80');
});

// Init Server
const app = express();
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://tagmanager.google.com", "https://www.googletagmanager.com", "https://www.google-analytics.com", "'sha256-IFLwGasMSK0CkL5uDNotHgL1Px0uJRP8gyX7sY0IfHU='"],
      imgSrc: ["'self'", "https://ssl.gstatic.com",  "https://www.gstatic.com", "https://i.ytimg.com"],
      frameSrc: ["'self'", "https://www.youtube.com", "https://www.youtube.com/embed/"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://fonts.googleapis.com"],
      connectSrc: ["'self'", "https://www.google-analytics.com"]
    }
  },
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') }));
app.use(express.json());
const accessLogStream = createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})
app.use(morgan('combined', { stream: accessLogStream }))
app.use(compression({ filter: shouldCompress }))
app.use(redirectWwwTraffic);
app.use(routerFiles);
app.use(routerHardware);
app.use('/', express.static('public'));

const httpsServer = https.createServer({
  ca: fs.readFileSync(__dirname + "/../ssl/ca_bundle.crt", 'utf8'),
  key: fs.readFileSync(__dirname + "/../ssl/private.key", 'utf8'),
  cert: fs.readFileSync(__dirname + "/../ssl/certificate.crt", 'utf8')
}, app);
httpsServer.listen(443, () => console.log('Init server with SSL, port 443'));
