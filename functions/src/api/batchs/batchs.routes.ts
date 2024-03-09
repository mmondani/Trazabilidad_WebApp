import * as express from 'express';
import { Firestore } from 'firebase-admin/firestore';
import * as usersMiddleware from '../users/middlewares/users.middleware';
import * as batchsMiddleware from './middlewares/batchs.middleware';
import * as batchsControllers from './controllers/batchs.controller';


export default (app: express.Express, db: Firestore) => {
    app.get("/batchs", [
        usersMiddleware.isTokenValid,
        usersMiddleware.isPermissionLevelFulfilled(["admin", "operator"]),
        batchsControllers.getBatchs (db)
    ]);

    app.post("/batchs/next_from", [
        usersMiddleware.isTokenValid,
        usersMiddleware.isPermissionLevelFulfilled(["admin", "operator"]),
        batchsMiddleware.nextFromValidator,
        batchsControllers.getNextFrom (db)
    ]);

    app.post("/batchs", [
        usersMiddleware.isTokenValid,
        usersMiddleware.isPermissionLevelFulfilled(["admin", "operator"]),
        batchsMiddleware.newBatchValidator,
        batchsControllers.newBatch (db)
    ]);

    app.patch("/batchs", [
        usersMiddleware.isTokenValid,
        usersMiddleware.isPermissionLevelFulfilled(["admin"]),
        batchsMiddleware.patchBatchValidator,
        batchsControllers.patchBatch(db)
    ]);

    app.delete("/batchs/:id", [
        usersMiddleware.isTokenValid,
        usersMiddleware.isPermissionLevelFulfilled(["admin"]),
        batchsControllers.deleteBatch(db)
    ]);
};