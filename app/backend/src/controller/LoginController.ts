import { Request, Response } from 'express';
import LoginService from '../service/LoginService';

export default class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public async login(_req: Request, res: Response) {
    const { email, password } = _req.body;
    const serviceResponse = await this.loginService.login(email, password);
    res.status(200).json(serviceResponse.message);
  }

  // public async getLogin(req: Request, res: Response) {
  //   const { authorization } = req.headers;
  //   const { id } = req.user;
  //   const serviceResponse = await this.loginService.getLogin(authorization);
  //   res.status(200).json(serviceResponse);
  // }
}
