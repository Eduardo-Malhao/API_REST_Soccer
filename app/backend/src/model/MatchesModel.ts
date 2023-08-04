import MatchesInterface from '../Interfaces/MatchesInterface';
import MatchesSequelize from '../database/models/MatchesSequelize';
import TeamsSequelize from '../database/models/TeamsSequelize';

export default class MatchesModel {
  private model = MatchesSequelize;

  async findAll(): Promise<MatchesInterface[]> {
    const response = await this.model.findAll({
      include: [
        { model: TeamsSequelize, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsSequelize, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return response;
  }

  async findInProgress(): Promise<MatchesInterface[]> {
    const response = await this.model.findAll({
      where: { inProgress: true },
      include: [
        { model: TeamsSequelize, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsSequelize, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return response;
  }

  async findFinished(): Promise<MatchesInterface[]> {
    const response = await this.model.findAll({
      where: { inProgress: false },
      include: [
        { model: TeamsSequelize, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsSequelize, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return response;
  }

  async finishMatch(id: number) {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(id: number, homeGoals: number, awayGoals: number) {
    await this.model.update({
      homeTeamGoals: homeGoals, awayTeamGoals: awayGoals }, { where: { id } });
  }
}
