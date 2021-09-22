import http from 'http';
import { app } from './lib/app.js';

const newServer = http.createServer(app);
newServer.listen(5050);
