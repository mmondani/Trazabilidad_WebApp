import * as express from 'express';
import { Firestore } from 'firebase-admin/firestore';
import * as usersMiddleware from '../users/middlewares/users.middleware';
import * as originsMiddlewares from './middlewares/origins.middleware';
import * as originsControllers from './controllers/origins.controller';


export default (app: express.Express, db: Firestore) => {
    app.get("/origins", [
        usersMiddleware.isTokenValid,
        usersMiddleware.isPermissionLevelFulfilled(["admin", "operator"]),
        originsControllers.getOrigins (db)
    ]);

    app.post("/origins", [
        usersMiddleware.isTokenValid,
        usersMiddleware.isPermissionLevelFulfilled(["admin"]),
        originsMiddlewares.newOriginValidator,
        originsControllers.newOrigin (db)
    ]);
    
    app.patch("/origins", [
        usersMiddleware.isTokenValid,
        usersMiddleware.isPermissionLevelFulfilled(["admin"]),
        originsMiddlewares.patchOriginValidator,
        originsControllers.patchOrigin(db)
    ]);
    
    app.delete("/origins/:id", [
        usersMiddleware.isTokenValid,
        usersMiddleware.isPermissionLevelFulfilled(["admin"]),
        originsControllers.deleteOrigin(db)
    ]);
};