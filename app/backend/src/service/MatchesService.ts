import MatchesInterface from '../Interfaces/MatchesInterface';
import MatchesModel from '../model/MatchesModel';
import TeamsModel from '../model/TeamsModel';
import { FinishMatchInterface } from '../Interfaces/FinishMatchInterface';
import { CreateMatchInterface } from '../Interfaces/CreateMatchInterface';

export default class MatchesService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
    private teamsModel: TeamsModel = new TeamsModel(),
  ) { }

  static internalError = 'Inernal server error';
  public async findAll(): Promise<MatchesInterface[]> {
    const allTeams = await this.matchesModel.findAll();
    return allTeams;
  }

  public async findInProgress(): Promise<MatchesInterface[]> {
    const onGoingMatches = await this.matchesModel.findInProgress();
    return onGoingMatches;
  }

  public async findFinished(): Promise<MatchesInterface[]> {
    const finishedMatches = await this.matchesModel.findFinished();
    return finishedMatches;
  }

  public async finishMatch(id: number): Promise<FinishMatchInterface> {
    try {
      await this.matchesModel.finishMatch(id);
      return { type: 200, message: { message: 'Finished' } };
    } catch (error: any) {
      if (error.message) {
        return { type: 404, message: { message: 'Match not found' } };
      }
      console.log(error);
      return { type: 500, message: { message: MatchesService.internalError } };
    }
  }

  public async updateMatch(id: number, homeGoals: number, awayGoals: number)
    : Promise<FinishMatchInterface> {
    try {
      await this.matchesModel.updateMatch(id, homeGoals, awayGoals);
      return { type: 200, message: { message: 'Updated' } };
    } catch (error: any) {
      if (error.message) {
        return { type: 404, message: { message: 'Match not found' } };
      }
      console.log(error);
      return { type: 500, message: { message: MatchesService.internalError } };
    }
  }

  public async create(homeId: number, awayId: number, homeGoals: number, awayGoals: number)
    : Promise<FinishMatchInterface | CreateMatchInterface> {
    try {
      const foundHomeTeam = await this.teamsModel.findById(homeId);
      const foundAwayTeam = await this.teamsModel.findById(awayId);
      if (foundAwayTeam !== null && foundHomeTeam !== null) {
        const create = await this.matchesModel.create(homeId, awayId, homeGoals, awayGoals);
        return { type: 201, message: create };
      }

      return { type: 404, message: { message: 'There is no team with such id!' } };
    } catch (error: any) {
      if (error.message) {
        return { type: 401, message: { message: 'Match not created' } };
      }
    }
    console.log(Error);
    return { type: 500, message: { message: MatchesService.internalError } };
  }
}
