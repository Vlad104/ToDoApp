import { Router } from 'express';

import taskPost from './taskPost';
import tasksGet from './tasksGet';

const tasksController = Router();

tasksController.get('/', tasksGet);
tasksController.post('/', taskPost);

export default tasksController;
