import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {db} from './config/firebase';
import userRoutes from './api/users/users.routes';
import batchRoutes from './api/batchs/batchs.routes';
import originRoutes from './api/origins/origins.routes';
import logsRoutes from "./api/logs/logs.routes"

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

userRoutes(app, db);
batchRoutes(app, db);
originRoutes(app, db);
logsRoutes(app, db);

exports.api = functions.https.onRequest(app);