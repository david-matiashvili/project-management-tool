import userService from '../services/user_service.js';
import pickProperties from '../utilities/pick_properties.js';


const userController = {
    getUserById: async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },
    searchUsersByEmail: async (req, res) => {
        try {
            const {projectId} = req.query;
            const emailPattern = req.params.emailPattern;

            const users = await userService.searchUsersByEmail(emailPattern, projectId);
            res.status(200).json({message: "Success", data: users});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },
    registerUser: async (req, res) => {
        try {
            const keys = ['email', 'password', 'username'];
            const data = pickProperties(req.body, keys);
            const savedUser = await userService.registerUser(data);
            res.status(201).json({message: "Registered successfully", data: savedUser});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },
    loginUser: async (req, res) => {
        try {
            const {email, password} = req.body;
            const userData = await userService.loginUser(email, password);
            res.status(200).json({message: "Logged in successfully", data: {...userData}});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },
    logoutUser: async (req, res) => {
        try {
            const {token} = req.body;
            const deletedToken = await userService.logoutUser(token);
            res.status(202).json({message: "Logged out successfully", data: {deletedToken}});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },
    validateUser: async (req, res) => {
        try {
            const {accessToken} = req.body;
            const user = await userService.validateUser(accessToken);
            res.status(200).json({message: "User validated", data: {user}});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },
    refreshUser: async (req, res) => {
        try {
            const {refreshToken} = req.body;
            const userData = await userService.refreshUser(refreshToken);
            res.status(200).json({message: "Refreshed successfully", data: {...userData}});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

export default userController;