import MatchesInterface from '../Interfaces/MatchesInterface';
import MatchesModel from '../model/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
  ) { }

  public async findAll(): Promise<MatchesInterface[]> {
    const allTeams = await this.matchesModel.findAll();
    return allTeams;
  }
}
