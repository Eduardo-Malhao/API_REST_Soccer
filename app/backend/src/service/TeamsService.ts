import TeamsInterface from '../Interfaces/TeamsInterface';
import TeamsTypeInterface from '../Interfaces/TeamsTypeInterface';
import TeamsModel from '../model/TeamsModel';

export default class TeamsService {
  constructor(
    private teamsModel: TeamsModel = new TeamsModel(),
  ) { }

  public async findAll(): Promise<TeamsInterface[]> {
    const allTeams = await this.teamsModel.findAll();
    return allTeams;
  }

  public async findById(id: number): Promise<TeamsTypeInterface> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { type: 400, message: 'Team not found' };

    return { type: 200, message: team };
  }
}
