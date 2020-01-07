import { Router } from 'express';
import tasksController from './tasks/tasksController';
import usersController from './users/usersController';

const router = Router();

router.use('/tasks', tasksController);
router.use('/users', usersController);

export default router;
