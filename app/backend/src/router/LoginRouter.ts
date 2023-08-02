import { Request, Response, Router } from 'express';
import LoginController from '../controller/LoginController';
import LoginValidation from '../middleware/LoginValidation';
import TokenValidation from '../middleware/TokenValidation';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  LoginValidation.validateLogin,
  (req: Request, res: Response) => loginController.login(req, res),
);
router.get(
  '/role',
  TokenValidation.validateToken,
  (req: Request, res: Response) => loginController.login(req, res),
);

export default router;
