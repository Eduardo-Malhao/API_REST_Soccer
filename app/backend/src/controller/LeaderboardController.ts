import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';

export default class LoginController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public async getAllInfo(_req: Request, res: Response) {
    const { type, message } = await this.leaderboardService.getAllInfo();
    if (type === 200) return res.status(200).json({ message });
    return res.status(type).json({ message });
  }
}
