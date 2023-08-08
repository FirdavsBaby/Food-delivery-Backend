import { Router } from 'express';
import { Login, Register, VerifyEmail } from '../controllers/auth.controller.js';
import { isAuth } from '../../middlewares/isAuth.js';
import { currentUser } from '../../middlewares/current-user.js';
const router = Router();
router.post("/auth/register", Register);
router.post("/auth/verify", isAuth, currentUser, VerifyEmail);
router.post("/auth/login", Login);
export default router;
