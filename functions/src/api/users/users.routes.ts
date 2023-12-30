import * as express from 'express';
import { Firestore } from 'firebase-admin/firestore';
import * as usersMiddleware from './middlewares/users.middleware';
import * as usersControllers from './controllers/users.controller';


export default (app: express.Express, db: Firestore) => {
    app.post("/users/login", [
        usersMiddleware.loginValidator,
        usersControllers.login (db)
    ]);

    app.post("/users", [
        usersMiddleware.isTokenValid,
        usersMiddleware.isPermissionLevelFulfilled(["admin"]),
        usersMiddleware.newUserValidator,
        usersControllers.newUser(db)
    ]);
};