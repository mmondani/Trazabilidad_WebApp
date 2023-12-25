/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {db} from './config/firebase';
import userRoutes from './api/users/users.routes';

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors({origin: true}));

userRoutes(app, db);

exports.api = functions.https.onRequest(app);