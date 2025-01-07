import express from 'express';
import userController from '../controllers/user_controller.js';
const router = express.Router();

// Validation middlewares
import userRegisterValidation from '../middlewares/validations/user_register_validation.js';
import userLoginValidation from '../middlewares/validations/user_login_validation.js';
import userLoginStatusValidation from '../middlewares/validations/user_login_status_validation.js';
import userRefreshTokenValidation from '../middlewares/validations/user_refresh_token_validation.js';

router.post('/register', userRegisterValidation, userController.registerUser);
router.post('/login', userLoginValidation, userController.loginUser);
router.post('/logout', userRefreshTokenValidation, userController.logoutUser);
router.post('/validate', userLoginStatusValidation, userController.validateUser);
router.post('/refresh', userRefreshTokenValidation, userController.refreshUser);

export default router;