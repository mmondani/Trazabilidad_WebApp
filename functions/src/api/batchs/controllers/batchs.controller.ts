import { Firestore } from 'firebase-admin/firestore';
import * as batchsModel from '../models/batchs.model'
import { getCurrentWeekNumber } from '../../common/utilities/common.utilities';
import * as logsModel from '../../logs/models/logs.model';
import { TokenPayload } from '../../users/controllers/users.controller';
import { getOriginsById } from '../../origins/models/origins.model';


export const getBatchs = (db: Firestore) => {
    return async (req, res, next) => {

        try {
            let batchsList = await batchsModel.getBatchs(db);

            return res.status(200).send(batchsList);
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }
    }
};


export const getNextFrom = (db: Firestore) => {
    return async (req, res, next) => {
        let {originId, week, year} = req.body;

        if (!week) {
            week = getCurrentWeekNumber();
        }

        if (!year) {
            year = (new Date()).getFullYear();
        }

        let params = {
            originId,
            week,
            year
        };

        try {
            let nextFrom = await batchsModel.getNextFrom(db, params);

            return res.status(200).send(nextFrom);
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }
    }
};


export const newBatch = (db: Firestore) => {
    return async (req, res, next) => {

        let batch: batchsModel.Batch = {
            originId: req.body.originId,
            week: req.body.week,
            year: req.body.year,
            from: req.body.from,
            to: req.body.to,
            createdAt: (new Date()).getTime()
        }

        // Primero se chequea si el batch ya fue creado
        try {
            let newBatch = await batchsModel.createBatch(db, batch);

            if (newBatch) {
                let origin = await getOriginsById(db, newBatch.originId);
                let logMessage = await logsModel.batchs_newBatchMessage(newBatch, origin);
                await logsModel.newLog(
                    db, 
                    (<TokenPayload>req.token).email, 
                    logMessage);

                return res.status(200).send(newBatch);
            }
            else 
                return res.status(409).send({message: "batch already exists"});
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }

    }
};


export const patchBatch = (db: Firestore) => {
    return async (req, res, next) => {
        const {id, originId, week, year, from, to} = req.body;

        let params = {
            originId,
            week,
            year,
            from,
            to
        };

        for (let prop in params) {
            if (!params[prop])
                delete params[prop];
        }

        try {
            let originalBatch = await batchsModel.getBatchById(db, id);
            let modifiedBatch = await batchsModel.modifyBatch(db, id, params);

            if (modifiedBatch) {
                let origin = await getOriginsById(db, originalBatch.originId);
                let logMessage = await logsModel.batchs_modifyBatchMessage(originalBatch, origin, params);
                await logsModel.newLog(
                    db, 
                    (<TokenPayload>req.token).email, 
                    logMessage);

                return res.status(200).send(modifiedBatch);
            }
            else
                return res.status(400).send({errors: ["non-existent id"]});
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }
    }
};


export const deleteBatch = (db: Firestore) => {
    return async (req, res, next) => {

        try {
            let [batchDeleted, originId, week, year, from, to] = await batchsModel.deleteBatch(db, req.params.id);

            if (batchDeleted) {
                let origin = await getOriginsById(db, originId);
                let logMessage = await logsModel.batchs_deleteBatchMessage(origin, week, year, from, to);
                await logsModel.newLog(
                    db, 
                    (<TokenPayload>req.token).email, 
                    logMessage);

                return res.status(200).send();
            }
            else
                return res.status(400).send({errors: ["non-existent id"]});
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }
    }
};