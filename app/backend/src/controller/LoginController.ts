import { Request, Response } from 'express';
import LoginService from '../service/LoginService';

export default class LoginController {
  private teamsService: TeamsService;

  constructor() {
    this.loginService = new LoginService();
  }

  public async login(_req: Request, res: Response) {
    const { authorization } = _req.headers;
    const serviceResponse = await this.LoginService.login();
    res.status(200).json(serviceResponse);
  }
}
