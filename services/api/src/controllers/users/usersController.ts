import { Router } from 'express';

import signin from './signin';

const usersController = Router();

usersController.post('/', signin);

export default usersController;
