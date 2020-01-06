import { Router } from 'express';

import taskDelete from './taskDelete';
import taskPost from './taskPost';
import tasksDelete from './tasksDelete';
import tasksGet from './tasksGet';

const tasksController = Router();

tasksController.get('/', tasksGet);
tasksController.delete('/:id', taskDelete);
tasksController.delete('/', tasksDelete);
tasksController.post('/', taskPost);

export default tasksController;
