import * as express from 'express';
import { Firestore } from 'firebase-admin/firestore';

export default (app: express.Express, db: Firestore) => {
    app.get("/users/login", (req, res) => res.status(200).send('Hey there!'));
};