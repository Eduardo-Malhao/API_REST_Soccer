import MatchesInterface from '../Interfaces/MatchesInterface';
import MatchesModel from '../model/MatchesModel';
import { FinishMatchInterface } from '../Interfaces/FinishMatchInterface';

export default class MatchesService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
  ) { }

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
      return { type: 500, message: { message: 'Internal Server Error' } };
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
      return { type: 500, message: { message: 'Internal Server Error' } };
    }
  }
}
