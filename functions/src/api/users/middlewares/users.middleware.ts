import * as jwt from 'jsonwebtoken';
import * as functions from 'firebase-functions';


export const isTokenValid = (req, res, next) => {
    if (req.headers["authorization"]){
        let authorization = req.headers["authorization"].split(" ");

        if (authorization[0] === "Bearer") {
            try {
                req.token = jwt.verify(authorization[1], functions.config().jwt.key);

                return next();
            }
            catch(err) {
                return res.status(403).send();
            }
        }
        else {
            return res.status(401).send();
        }
    }
    else{
        return res.status(401).send();
    }
}


export const isPermissionLevelFulfilled = (requiredPermissionLevels: Array<string>) => {
    return (req, res, next) => {
        let userPermissionLevel = req.token.level;

        if (requiredPermissionLevels.includes(userPermissionLevel)) {
            return next();
        }
        else{
            return res.status(403).send();
        }
    };
};


export const loginValidator = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email)
            errors.push("email required");
        if (!req.body.password)
            errors.push("password required");

        if (errors.length > 0)
            return res.status(400).send({errors: errors});
        else
            return next();
    }
    else {
        return res.status(400).send({errors: ["email required", "password required"]});
    }
};


export const newUserValidator = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email)
            errors.push("email required");
        if (!req.body.password)
            errors.push("password required");
        if (!req.body.level)
            errors.push("level required");
        if (req.body.level && 
            !["admin", "operator"].includes(req.body.level))
            errors.push("non existent level");

        if (errors.length > 0)
            return res.status(400).send({errors: errors});
        else
            return next();
    }
    else {
        return res.status(400).send({errors: ["email required", "password required", "level required"]});
    }
};