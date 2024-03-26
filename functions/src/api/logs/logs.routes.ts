import * as express from 'express';
import { Firestore } from 'firebase-admin/firestore';
import * as usersMiddleware from '../users/middlewares/users.middleware';
import * as logsControllers from './controllers/logs.controller';


export default (app: express.Express, db: Firestore) => {
    app.get("/logs", [
        usersMiddleware.isTokenValid,
        usersMiddleware.isPermissionLevelFulfilled(["admin", "operator"]),
        logsControllers.getLogs (db)
    ]);
};