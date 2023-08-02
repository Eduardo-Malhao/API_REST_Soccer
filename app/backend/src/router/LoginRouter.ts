import { Request, Response, Router } from 'express';
import LoginController from '../controller/LoginController';
import LoginMiddleware from '../middleware/LoginValidation';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  LoginMiddleware.validateLogin,
  (req: Request, res: Response) => loginController.login(req, res),
);

export default router;
