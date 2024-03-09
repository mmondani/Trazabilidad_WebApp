export const newBatchValidator = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.originId)
            errors.push("originId required");
        if (!req.body.week)
            errors.push("week required");
        if (!req.body.year)
            errors.push("year required");
        if (!req.body.from)
            errors.push("from required");
        if (!req.body.to)
            errors.push("to required");

        if (errors.length > 0)
            return res.status(400).send({errors: errors});
        else
            return next();
    }
    else {
        return res.status(400).send({errors: ["originId required", "week required", "year required", "from required", "to required"]});
    }
};

export const patchBatchValidator = (req, res, next) => {
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


export const nextFromValidator = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.originId)
            errors.push("originId required");

        if (errors.length > 0)
            return res.status(400).send({errors: errors});
        else
            return next();
    }
    else {
        return res.status(400).send({errors: ["originId required"]});
    }
}