import { Request, Response, NextFunction } from 'express';
import EmailValidation from '../utils/EmailValidation';

export default class LoginValidation {
  private static passwordMinLength = 6;
  public static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!EmailValidation.isValidEmail(email)
    || password.length < LoginValidation.passwordMinLength) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
