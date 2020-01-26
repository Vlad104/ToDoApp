import { Router } from 'express';
import auth from '../modules/auth';
import authController from './auth/authController';
import tasksController from './tasks/tasksController';

const router = Router();

router.use('/auth', authController);
router.use('/tasks', tasksController, auth);

export default router;
