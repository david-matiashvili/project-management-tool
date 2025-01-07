import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(400).json({message: "Invalid Token"});
    try {
        req.user = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        next();
    } catch (error) {
        res.status(401).json({error: error, message: "Invalid Token"});
    }
}

export default authenticateToken;