import express from 'express';
import AuthMiddleware from '../middleware/auth.middleware.js';
import TaskController from '../controller/task.js';
import TaskMiddleware from '../middleware/task.middleware.js';

const { createTaskController, getAllTasksController, completeTaskController } =
  TaskController;
const { checkToken, verifyToken } = AuthMiddleware;
const { checkValidUser } = TaskMiddleware;

const router = express.Router();

router.post('/', checkToken, verifyToken, createTaskController);
router.get('/', getAllTasksController);
router.put(
  '/:taskId',
  checkToken,
  verifyToken,
  checkValidUser,
  completeTaskController
);

export default router;
