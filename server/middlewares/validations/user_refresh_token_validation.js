const userRefreshTokenValidation = (req, res, next) => {
    const {refreshToken} = req.body;

    if (!refreshToken) {
        res.status(400).send({message: "Refresh token is required"});
        return;
    }

    next();
}

export default userRefreshTokenValidation;