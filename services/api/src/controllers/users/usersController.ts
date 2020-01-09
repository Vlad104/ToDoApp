import { Router } from 'express';

import signin from './signin';
import signup from './signup';

const usersController = Router();

usersController.post('/signin', signin);
usersController.post('/signup', signup);

export default usersController;
