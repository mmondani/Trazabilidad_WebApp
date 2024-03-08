export const newOriginValidator = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.identifier)
            errors.push("identifier required");
        if (!req.body.description)
            errors.push("description required");

        if (errors.length > 0)
            return res.status(400).send({errors: errors});
        else
            return next();
    }
    else {
        return res.status(400).send({errors: ["identifier required", "description required"]});
    }
};


export const patchOriginValidator = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.id)
            errors.push("id required");

        if (errors.length > 0)
            return res.status(400).send({errors: errors});
        else
            return next();
    }
    else {
        return res.status(400).send({errors: ["id required"]});
    }
}