import { Firestore } from 'firebase-admin/firestore';
import * as originsModel from '../models/origins.model'


export const getOrigins = (db: Firestore) => {
    return async (req, res, next) => {

        try {
            let originsList = await originsModel.getOrigins(db);

            return res.status(200).send(originsList);
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }
    }
};


export const newOrigin = (db: Firestore) => {
    return async (req, res, next) => {

        let batch: originsModel.Origin = {
            identifier: req.body.identifier,
            description: req.body.description,
            createdAt: (new Date()).getTime()
        }

        // Primero se chequea si el origin ya fue creado
        try {
            let newOrigin = await originsModel.createOrigin(db, batch);

            if (newOrigin)
                return res.status(200).send(newOrigin);
            else 
                return res.status(409).send({message: "origin already exists"});
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }

    }
};


export const patchOrigin = (db: Firestore) => {
    return async (req, res, next) => {
        const {id, identifier, description} = req.body;

        let params = {
            identifier,
            description
        };

        for (let prop in params) {
            if (!params[prop])
                delete params[prop];
        }

        try {
            let modifiedOrigin = await originsModel.modifyOrigin(db, id, params);

            if (modifiedOrigin)
                return res.status(200).send(modifiedOrigin);
            else
                return res.status(400).send({errors: ["non-existent id"]});
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }
    }
};


export const deleteOrigin = (db: Firestore) => {
    return async (req, res, next) => {

        try {
            let originDeleted = await originsModel.deleteOrigin(db, req.params.id);

            if (originDeleted) 
                return res.status(200).send();
            else
                return res.status(400).send({errors: ["non-existent id"]});
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }
    }
};