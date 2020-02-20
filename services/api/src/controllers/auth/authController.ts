import { Router } from 'express';

import session from './session';
import signin from './signin';
import signup from './signup';

const authController = Router();

authController.get('/session', session);
authController.post('/signin', signin);
authController.post('/signup', signup);

export default authController;
