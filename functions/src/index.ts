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

const app = express();
app.get('/', (req, res) => res.status(200).send('Hey there!'));
exports.app = functions.https.onRequest(app);