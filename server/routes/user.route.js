import {Router as userRouter} from 'express';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { UploadeAvatar } from '../controllers/user.controller.js';
import { registerUserController ,verifyEmailController,loginUserController, logoutUserController,updateUserDetails,forgotPasswordController, verifyForgotPasswordOtpController,resetPasswordController, refreshTokenController } from '../controllers/user.controller.js';

const router = userRouter();

router.post('/register', registerUserController);

router.post('/verify-email', verifyEmailController);

router.post('/login', loginUserController);

router.get('/logout',auth, logoutUserController );
router.put('/upload-avatar', upload.single('avatar'), auth, UploadeAvatar);
router.put('/update-user', auth, updateUserDetails);
router.put('/forgot-password', forgotPasswordController);
router.put('/verify-forgot-password-otp', verifyForgotPasswordOtpController);
router.put('/reset-password', resetPasswordController);
router.post('/refresh-token', refreshTokenController);

export default router;