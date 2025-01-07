const userLoginValidation = (req, res, next) => {
    const {email, password} = req.body;

    if (!email) {
        res.status(400).send({message: "Email is required"});
        return;
    }

    if (!password) {
        res.status(400).send({message: "Password is required"});
        return;
    }

    next();
}

export default userLoginValidation;