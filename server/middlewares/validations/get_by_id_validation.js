const getByIdValidation = (req, res, next) => {
    const {id} = req.params;
    if (!id && isNaN(Number(id))) {
        res.status(401).send({message: 'Id is required or invalid'});
        return;
    }
    next();
}

export default getByIdValidation;