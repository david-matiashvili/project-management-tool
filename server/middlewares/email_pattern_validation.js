const emailPatternValidation = (req, res, next) => {
    const {emailPattern} = req.params;
    if (!emailPattern) {
        res.status(401).send('Nothing to search');
        return;
    }

    next();
}

export default emailPatternValidation;