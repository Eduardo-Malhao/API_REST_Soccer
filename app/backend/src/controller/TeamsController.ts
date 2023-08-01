import { Request, Response } from 'express';
import TeamsService from '../service/TeamsService';

export default class TeamsController {
  private teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  public async findAll(_req: Request, res: Response) {
    const serviceResponse = await this.teamsService.findAll();
    res.status(200).json(serviceResponse);
  }

  public async findById(_req: Request, res: Response) {
    const { id } = _req.params;
    const { type, message } = await this.teamsService.findById(+id);
    if (type === 400) {
      res.status(400).json({ message });
    }
    res.status(200).json(message);
  }
}
