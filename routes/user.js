import express from 'express';
import UserController from '../controller/user.js';
import ValidationMiddleware from '../middleware/validation.middleware.js';
import AuthMiddleware from '../middleware/auth.middleware.js';

const { createUserController, loginController } = UserController;
const { createUserInputValidation } = ValidationMiddleware;
const { checkIfUserExists, checkPassword } = AuthMiddleware;

const router = express.Router();

router.post('/', createUserInputValidation, createUserController);
router.post('/auth', checkIfUserExists, checkPassword, loginController);

export default router;
