
const userRegisterValidation = (req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password)
    {
        res.status(400).send({message: "All fields are required"});
        return;
    }

    if(username.length < 3)
    {
        res.status(400).send({message: "Username length must be at least 3 characters"});
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email))
    {
        res.status(400).send({message: "Invalid email address"});
        return;
    }

    if(password.length < 3)
    {
        res.status(400).send({message: "Password length must be at least 3 characters"});
        return;
    }

    next();
}

export default userRegisterValidation;