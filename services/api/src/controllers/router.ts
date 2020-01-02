import { Router } from 'express';
import tasksController from './tasks/tasksController';

const router = Router();

router.use('/tasks', tasksController);

export default router;
