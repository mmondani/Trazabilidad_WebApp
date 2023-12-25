import * as express from 'express';
import { Firestore } from 'firebase-admin/firestore';
import * as usersMiddleware from './middlewares/users.middleware';
import * as usersControllers from './controllers/users.controller';


export default (app: express.Express, db: Firestore) => {
    app.get("/users/login", (req, res) => res.status(200).send('Hey there!'));

    app.post("/users", [
        usersMiddleware.newUserValidator,
        usersControllers.newUser(db)
    ]);
};