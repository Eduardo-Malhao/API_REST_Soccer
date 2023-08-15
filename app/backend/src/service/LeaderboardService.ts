import { LeaderboardInterface } from '../Interfaces/LeaderboardInterface';
import MatchesModel from '../model/MatchesModel';
import TeamsModel from '../model/TeamsModel';

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
    console.log(response);
    return response;
  }

  // team = leaderbord[]
  public static homeWin(match, teams) {
    teams.forEach((team) => {
      const oldStats = team;

      if (team.name === match.homeTeam.teamName) {
        oldStats.totalPoints += 3;
        oldStats.totalGames += 1;
        oldStats.totalVictories += 1;
        oldStats.efficiency = +(
          (oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
      }
      if (team.name === match.awayTeam.teamName) {
        oldStats.totalPoints += 0;
        oldStats.totalGames += 1;
        oldStats.totalLosses += 1;
        oldStats.efficiency = +(
          (oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
      }
    });
  }

  public static awayWin(match, teams) {
    teams.forEach((team) => {
      const oldStats = team;

      if (team.name === match.homeTeam.teamName) {
        oldStats.totalPoints += 0;
        oldStats.totalGames += 1;
        oldStats.totalLosses += 1;
        oldStats.efficiency = +(
          (oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
      }
      if (team.name === match.awayTeam.teamName) {
        oldStats.totalPoints += 3;
        oldStats.totalGames += 1;
        oldStats.totalVictories += 1;
        oldStats.efficiency = +(
          (oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
      }
    });
  }

  public static draw(match, teams) {
    teams.forEach((team) => {
      const oldStats = team;

      if (team.name === match.homeTeam.teamName) {
        oldStats.totalPoints += 1;
        oldStats.totalGames += 1;
        oldStats.totalDraws += 1;
        oldStats.efficiency = +(
          (oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
      }
      if (team.name === match.awayTeam.teamName) {
        oldStats.totalPoints += 1;
        oldStats.totalGames += 1;
        oldStats.totalDraws += 1;
        oldStats.efficiency = +(
          (oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
      }
    });
  }

  public static goals(match, teams) {
    teams.forEach((team) => {
      const oldStats = team;
      oldStats.goalsFavor += match.homeTeamGoals;
      oldStats.goalsOwn += match.awayTeamGoals;
      oldStats.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
    });
  }

  public static makeArrayOfTeams(teams) { // array com nomes de times
    const leaderbord: LeaderboardInterface[] = [];

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

  public async getAllInfo() {
    const matches = await this.matches();
    const teamNames = await this.teamNames();
    const teamsLead = await LeaderboardService.makeArrayOfTeams(teamNames);

    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        LeaderboardService.homeWin(match, teamsLead);
        LeaderboardService.goals(match, teamsLead);
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        LeaderboardService.awayWin(match, teamsLead);
        LeaderboardService.goals(match, teamsLead);
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        LeaderboardService.draw(match, teamsLead);
        LeaderboardService.goals(match, teamsLead);
      }
    });
  }
}
