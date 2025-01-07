import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_ACCESS_TOKEN, {expiresIn: '15m'});
}

export default generateAccessToken;