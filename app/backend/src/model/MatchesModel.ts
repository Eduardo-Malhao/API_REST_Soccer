import MatchesInterface from '../Interfaces/MatchesInterface';
import MatchesSequelize from '../database/models/MatchesSequelize';
import TeamsSequelize from '../database/models/TeamsSequelize';

export default class MatchesModel {
  private model = MatchesSequelize;
  private teamsModel = TeamsSequelize;

  async findAll(): Promise<MatchesInterface[]> {
    const response = await this.model.findAll({
      include: [
        { model: TeamsSequelize, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsSequelize, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    // const ObjBuilder = response.map((element) => (
    //   {
    //     id: +element.id,
    //     homeTeamId: +element.homeTeamId,
    //     homeTeamGoals: +element.homeTeamGoals,
    //     awayTeamId: +element.awayTeamId,
    //     awayTeamGoals: +element.awayTeamGoals,
    //     inProgress: element.inProgress,
    //     homeTeam: { teamName: element.homeTeam?.team },
    //     awayTeam: { teamName: element.awayTeam?.team },
    //   }
    // ));
    // return ObjBuilder;
    return response;
  }
}
