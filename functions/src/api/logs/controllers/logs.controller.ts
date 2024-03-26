import { Firestore } from 'firebase-admin/firestore';
import * as logsModel from '../models/logs.model'


export const getLogs = (db: Firestore) => {
    return async (req, res, next) => {

        try {
            let originsList = await logsModel.getLogs(db);

            return res.status(200).send(originsList);
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }
    }
};