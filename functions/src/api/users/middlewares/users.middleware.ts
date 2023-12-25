
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