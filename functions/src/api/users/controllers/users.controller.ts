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
            let newUser = await usersModels.createUser(db, user);

            if (newUser)
                return res.status(200).send(newUser);
            else 
                return res.status(409).send({message: "email address is already being used"});
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }

    }
};


export const getUsers = (db: Firestore) => {
    return async (req, res, next) => {

        try {
            let usersList = await usersModels.getUsers(db);

            return res.status(200).send(usersList);
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
            let modifiedUser = await usersModels.modifyUser(db, id, params);

            if (modifiedUser)
                return res.status(200).send(modifiedUser);
            else
                return res.status(400).send({errors: ["non-existent id"]});
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }
    }
};


export const deleteUser = (db: Firestore) => {
    return async (req, res, next) => {

        try {
            let userDeleted = await usersModels.deleteUser(db, req.params.id);

            if (userDeleted) 
                return res.status(200).send();
            else
                return res.status(400).send({errors: ["non-existent id"]});
        }
        catch (error) {
            return res.status(500).send({message: "server internal error - " + error});
        }
    }
};