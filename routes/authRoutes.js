import express from 'express';
import authController from '../controllers/authController.js';
import authJwt from '../middlewares/authJwt.js';

const authRouter = express.Router();
const { verifyToken, verifyResetPasswordToken } = authJwt;

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/logout', verifyToken, authController.logout);
authRouter.get('/verified-email/:token', authController.verifiedEmail);
authRouter.post('/change-password', verifyToken, authController.changePassword);
authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post('/reset-password/:token', verifyResetPasswordToken, authController.resetPassword);

export default authRouter;
