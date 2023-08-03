import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';

export default class MatchesController {
  private matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  public async findAll(_req: Request, res: Response) {
    const serviceResponse = await this.matchesService.findAll();
    res.status(200).json(serviceResponse);
  }
}
