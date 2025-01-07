const userLoginStatusValidation = (req, res, next) => {
    const {accessToken} = req.body;

    if (!accessToken) {
        res.status(400).send({message: "Token is required"});
        return;
    }

    next();
}

export default userLoginStatusValidation;