import { Request, Response } from 'express';
import LoginService from '../service/LoginService';

export default class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public async login(_req: Request, res: Response) {
    const { email, password } = _req.body;
    const { type, message } = await this.loginService.login(email, password);
    if (type === 401) return res.status(401).json({ message });
    return res.status(200).json({ token: message });
  }

  public async findUserRole(req: Request, res: Response) {
    const { id } = res.locals.user;
    const { type, message } = await this.loginService.findUserRole(id);
    if (type === 400) return res.status(400).json({ message });
    return res.status(200).json(message);
  }
}
