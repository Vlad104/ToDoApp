import { Router } from 'express';

import signin from './signin';
import signup from './signup';

const authController = Router();

authController.post('/signin', signin);
authController.post('/signup', signup);

export default authController;
