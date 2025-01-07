const getByProjectIdValidation = (req, res, next) => {
    const {projectId} = req.params;
    if (!projectId && isNaN(Number(projectId))) {
        res.status(401).send({message: 'projectId is required or invalid'});
        return;
    }
    next();
}

export default getByProjectIdValidation;