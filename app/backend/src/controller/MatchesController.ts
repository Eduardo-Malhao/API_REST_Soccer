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

  public async findInProgress(_req: Request, res: Response) {
    const serviceResponse = await this.matchesService.findInProgress();
    res.status(200).json(serviceResponse);
  }

  public async findFinished(_req: Request, res: Response) {
    const serviceResponse = await this.matchesService.findFinished();
    res.status(200).json(serviceResponse);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await this.matchesService.finishMatch(+id);
    if (type === 404) return res.status(404).json({ message });
    res.status(200).json({ message });
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { type, message } = await
    this.matchesService.updateMatch(+id, homeTeamGoals, awayTeamGoals);
    if (type === 404) return res.status(404).json({ message });
    res.status(200).json({ message });
  }

  public async create(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const { type, message } = await this.matchesService
      .create(+homeTeamId, +awayTeamId, +homeTeamGoals, +awayTeamGoals);
    if (type === 401) return res.status(401).json({ message });
    res.status(200).json(message);
  }
}
