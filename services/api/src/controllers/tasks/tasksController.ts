import { Router } from 'express';
import tasksGet from './tasksGet';

const tasksController = Router();

tasksController.get('/', tasksGet);

export default tasksController;
