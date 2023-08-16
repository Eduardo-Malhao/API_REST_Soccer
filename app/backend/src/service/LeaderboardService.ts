import TeamsInterface from '../Interfaces/TeamsInterface';
// import { IHomeAwayLeaderboard } from '../Interfaces/IHomeAwayLeaderboard';
import { IAllLeaderboard } from '../Interfaces/IAllLeaderboard';
import MatchesModel from '../model/MatchesModel';
import TeamsModel from '../model/TeamsModel';
import HomeLeaderboard from '../utils/HomeLeaderboard';
import AwayLeaderboard from '../utils/AwayLeaderboard';
import AllLeaderboard from '../utils/AllLeaderboard';
import leaderboardSorter from '../utils/LeaderboardSorter';

export default class LeaderboardService {
  constructor(
    private matchModel: MatchesModel = new MatchesModel(),
    private teamsModel: TeamsModel = new TeamsModel(),
  ) { }

  public async matches() {
    const response = await this.matchModel.findFinished();
    return response;
  }

  public async teamNames() {
    const response = await this.teamsModel.findAllWithoutId();
    return response;
  }

  public static makeArrayOfAllTeams(teams: TeamsInterface[]) { // array com nomes de times
    const leaderbord: IAllLeaderboard[] = [];

    teams.forEach((team) => {
      leaderbord.push({
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      });
    });
    return leaderbord;
  }

  public async getHomeInfo() {
    const matches = await this.matches();
    const teamNames = await this.teamNames();
    const teamsLead = await LeaderboardService.makeArrayOfAllTeams(teamNames);

    const leaderboard = HomeLeaderboard.generateHomeLeaderboard(matches, teamsLead);
    const sorted = leaderboardSorter.leaderboardSorter(leaderboard);
    return { type: 200, message: sorted };
  }

  public async getAwayInfo() {
    const matches = await this.matches();
    const teamNames = await this.teamNames();
    const teamsLead = await LeaderboardService.makeArrayOfAllTeams(teamNames);

    const leaderboard = AwayLeaderboard.generateAwayLeaderboard(matches, teamsLead);
    const sorted = leaderboardSorter.leaderboardSorter(leaderboard);
    return { type: 200, message: sorted };
  }

  public async getAllInfo() {
    const matches = await this.matches();
    const teamNames = await this.teamNames();
    const teamsLead = await LeaderboardService.makeArrayOfAllTeams(teamNames);

    const leaderboard = AllLeaderboard.generateAllLeaderboard(matches, teamsLead);
    const sorted = leaderboardSorter.leaderboardSorter(leaderboard);
    return { type: 200, message: sorted };
  }
}
