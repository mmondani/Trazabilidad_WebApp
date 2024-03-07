import { Firestore } from 'firebase-admin/firestore';
import * as batchsModel from '../models/batchs.model'


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

            if (newBatch)
                return res.status(200).send(newBatch);
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
            let modifiedBatch = await batchsModel.modifyBatch(db, id, params);

            if (modifiedBatch)
                return res.status(200).send(modifiedBatch);
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
            let batchDeleted = await batchsModel.deleteBatch(db, req.params.id);

            if (batchDeleted) 
                return res.status(200).send();
            else
                return res.status(400).send({errors: ["non-existent id"]});
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }
    }
};