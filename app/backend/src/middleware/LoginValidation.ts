import { Request, Response, NextFunction } from 'express';
import { LoginInterface } from '../Interfaces/LoginInterface';

class LoginValidation {
  public static validateLogin(req: Request, res: Response, next: NextFunction) {
    const loginData: LoginInterface = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!loginData || !loginData.email || !loginData.password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(loginData.email)) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    if (loginData.password.length < 6) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    next();
  }
}

export default LoginValidation;
