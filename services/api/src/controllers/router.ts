import { Router } from 'express';
import authController from './auth/authController';
import tasksController from './tasks/tasksController';

const router = Router();

router.use('/auth', authController);
router.use('/tasks', tasksController);

export default router;
