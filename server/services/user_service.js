import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateAccessToken from '../helpers/generate_access_token.js';

dotenv.config();  // Load environment variables

const userService = {
    getUserById: async (id) => {
        const user = await User.getById(id);
        if (!user) {
            throw new Error(`User not found: ${id}`);
        }

        return user;
    },
    searchUsersByEmail: async (emailPattern, projectId) => {
        const emails = await User.searchUsersByEmail(emailPattern, projectId);

        return emails.map((email) => {
            return email.email
        });
    },
    loginUser: async (email, password) => {
        const user = await User.getByEmail(email);
        if (!user) {
            throw new Error(`User not found: ${email}`);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!user || !passwordMatch) {
            throw new Error(`Email or password is incorrect`);
        }

        const userData = {
            userId: user.id,
            username: user.username,
            email: user.email
        };

        const accessToken = generateAccessToken(userData);
        const refreshToken = jwt.sign(userData, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});

        const savedToken = await User.saveRefreshToken(refreshToken);
        if (!!savedToken) {
            throw new Error(`Refresh token cannot be saved in db`);
        }

        return {accessToken, refreshToken, user: userData};
    },
    refreshUser: async (refreshToken) => {
        const isToken = await User.getRefreshToken(refreshToken);

        if (!isToken) {
            throw new Error(`Refresh token not found`);
        }

        let user = {};
        try {
            user = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
        } catch (error) {
            await User.deleteRefreshToken(refreshToken);
            throw new Error(`Refresh token cannot be verified`);
        }

        const userData = {
            userId: user.userId,
            username: user.username,
            email: user.email
        };

        const accessToken = generateAccessToken(userData);
        return {accessToken, user: userData}
    },
    registerUser: async (data) => {
        const foundedEmail = await User.getByEmail(data.email);
        if (foundedEmail) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        return await User.save({...data, password: hashedPassword});
    },
    logoutUser: async (token) => {
        return await User.deleteRefreshToken(token);
    },
    validateUser: async (accessToken) => {

        let user = {};
        try {
            user = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
        } catch (error) {
            throw new Error('Token is not valid');
        }
        const userData = {
            userId: user.userId,
            username: user.username,
            email: user.email
        };

        return {...userData};
    }
}

export default userService;