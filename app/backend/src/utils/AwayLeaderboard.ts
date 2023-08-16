import MatchesInterface from '../Interfaces/MatchesInterface';
import { IAllLeaderboard } from '../Interfaces/IAllLeaderboard';

export default class AwayLeaderboard {
  // team = leaderbord[]
  public static awayWin(match: any, teams: any) {
    teams.forEach((team: IAllLeaderboard) => {
      const oldStats = team;

      if (team.name === match.awayTeam.teamName) {
        oldStats.totalPoints += 3;
        oldStats.totalGames += 1;
        oldStats.totalVictories += 1;
        oldStats.efficiency = +(
          (oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
      }
    });
  }

  public static awayLoss(match: any, teams: any) {
    teams.forEach((team: IAllLeaderboard) => {
      const oldStats = team;

      if (team.name === match.awayTeam.teamName) {
        oldStats.totalPoints += 0;
        oldStats.totalGames += 1;
        oldStats.totalLosses += 1;
        oldStats.efficiency = +(
          (oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
      }
    });
  }

  public static awayDraw(match: any, teams: any) {
    teams.forEach((team: IAllLeaderboard) => {
      const oldStats = team;

      if (team.name === match.awayTeam.teamName) {
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
      if (team.name === match.awayTeam.teamName) {
        oldStats.goalsFavor += match.awayTeamGoals;
        oldStats.goalsOwn += match.homeTeamGoals;
        oldStats.goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
      }
    });
  }

  public static generateAwayLeaderboard(
    matches: MatchesInterface[],
    teamLead: IAllLeaderboard[],
  ) {
    matches.forEach((match: any) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        AwayLeaderboard.awayWin(match, teamLead);
        AwayLeaderboard.goals(match, teamLead);
      }
      if (match.awayTeamGoals === match.homeTeamGoals) {
        AwayLeaderboard.awayDraw(match, teamLead);
        AwayLeaderboard.goals(match, teamLead);
      }
      if (match.awayTeamGoals < match.homeTeamGoals) {
        AwayLeaderboard.awayLoss(match, teamLead);
        AwayLeaderboard.goals(match, teamLead);
      }
    });
    return teamLead;
  }
}
