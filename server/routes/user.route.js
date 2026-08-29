import {Router as userRouter} from 'express';
import { registerUserController ,verifyEmailController,loginUserController } from '../controllers/user.controller.js';

const router = userRouter();

router.post('/register', registerUserController);

router.post('/verify-email', verifyEmailController);

router.post('/login', loginUserController);

export default router;