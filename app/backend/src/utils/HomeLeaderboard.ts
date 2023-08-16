import MatchesInterface from '../Interfaces/MatchesInterface';
import { IAllLeaderboard } from '../Interfaces/IAllLeaderboard';

export default class HomeLeaderboard {
  // team = leaderbord[]
  public static homeWin(match: any, teams: any) {
    teams.forEach((team: IAllLeaderboard) => {
      const oldStats = team;

      if (team.name === match.homeTeam.teamName) {
        oldStats.totalPoints += 3;
        oldStats.totalGames += 1;
        oldStats.totalVictories += 1;
        oldStats.efficiency = +(
          (oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
      }
    });
  }

  public static homeLoss(match: any, teams: any) {
    teams.forEach((team: IAllLeaderboard) => {
      const oldStats = team;

      if (team.name === match.homeTeam.teamName) {
        oldStats.totalPoints += 0;
        oldStats.totalGames += 1;
        oldStats.totalLosses += 1;
        oldStats.efficiency = +(
          (oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
      }
    });
  }

  public static homeDraw(match: any, teams: any) {
    teams.forEach((team: IAllLeaderboard) => {
      const oldStats = team;

      if (team.name === match.homeTeam.teamName) {
        oldStats.totalPoints += 1;
        oldStats.totalGames += 1;
        oldStats.totalDraws += 1;
        oldStats.efficiency = +(
          (oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
      }
    });
  }

  public static goals(match: any, teams: any) {
    teams.forEach((team: IAllLeaderboard) => {
      const oldStats = team;

      if (team.name === match.homeTeam.teamName) {
        oldStats.goalsFavor += match.homeTeamGoals;
        oldStats.goalsOwn += match.awayTeamGoals;
        oldStats.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
      }
    });
  }

  public static generateHomeLeaderboard(
    matches: MatchesInterface[],
    teamLead: IAllLeaderboard[],
  ) {
    matches.forEach((match: any) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        HomeLeaderboard.homeWin(match, teamLead);
        HomeLeaderboard.goals(match, teamLead);
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        HomeLeaderboard.homeDraw(match, teamLead);
        HomeLeaderboard.goals(match, teamLead);
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        HomeLeaderboard.homeLoss(match, teamLead);
        HomeLeaderboard.goals(match, teamLead);
      }
    });
    return teamLead;
  }
}
