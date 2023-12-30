import { hashPassword, isPasswordCorrect } from '../../common/utilities/common.utilities';
import { Firestore } from 'firebase-admin/firestore';
import * as usersModels from '../models/users.models'
import * as jwt from 'jsonwebtoken';
import * as functions from 'firebase-functions';

export const login = (db:Firestore) => {
    return async (req, res, next) => {
        const {email, password} = req.body;

        try {
            const userList = (await db.collection("users").where("email", "==", email).get());

            if (userList.empty) {
                return res.status(401).send({message: "incorrect email or password"});
            }
            else {
                const user = userList.docs[0];
                if (isPasswordCorrect(password, user.get("password"))) {
                    const token = jwt.sign({
                            email: user.get("email"),
                            level: user.get("level")
                        },
                        functions.config().jwt.key,
                        {
                            expiresIn: "1 day"
                        }
                    );
    
                    return res.status(200).send({token: token});
                }
                else {
                    return res.status(401).send({message: "incorrect email or password"});
                }
            }
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }

    };

};

export const newUser = (db: Firestore) => {
    return async (req, res, next) => {

        let user:usersModels.User = {
            email: req.body.email,
            password: hashPassword(req.body.password),
            createdAt: (new Date()).getTime(),
            level: req.body.level
        }

        // Primero se chequea si el email ya fue registrado
        try {
            let userExist = await usersModels.userExists(db, req.body.email);

            if (userExist)
                return res.status(409).send({message: "email address is already being used"});
    
            // Si no existe, se lo crea en la base de datos
            const entry = db.collection("users").doc();
            entry.set(user);

            return res.status(200).send({
                id: entry.id,
                email: user.email,
                level: user.level,
                createdAt: user.createdAt
            });
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }

    }
};


export const patchUser = (db: Firestore) => {
    return async (req, res, next) => {
        const {id, password, level} = req.body;

        let params = {
            password,
            level
        };

        for (let prop in params) {
            if (!params[prop])
                delete params[prop];
        }

        // Si la propiedad password está presente, se la hashea antes de hacer el update
        if (params.password)
            params.password = hashPassword(params.password);

        try {
            const userDoc = db.collection("users").doc(id);

            if (userDoc) {
                await userDoc.update(params);

                const userData = await db.collection("users").doc(id).get();
    
                return res.status(200).send({
                    id: userData.id,
                    email: userData.get("email"),
                    level: userData.get("level"),
                    createdAt: userData.get("createdAt")
                });
            }
            else {
                return res.status(400).send({errors: ["non-existent id"]});
            }
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }
    }
};