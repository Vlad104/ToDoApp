import { Router } from 'express';

import sessionDelete from './sessionDelete';
import sessionGet from './sessionGet';
import signin from './signin';
import signup from './signup';

const authController = Router();

authController.get('/session', sessionGet);
authController.delete('/session', sessionDelete);
authController.post('/signin', signin);
authController.post('/signup', signup);

export default authController;
