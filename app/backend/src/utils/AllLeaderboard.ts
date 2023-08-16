import MatchesInterface from '../Interfaces/MatchesInterface';
import { IAllLeaderboard } from '../Interfaces/IAllLeaderboard';

export default class LeaderboardService {
  // team = leaderbord[]
  public static allHomeWin(match: any, teams: any) {
    teams.forEach((team: IAllLeaderboard) => {
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

  public static allAwayWin(match: any, teams: any) {
    teams.forEach((team: IAllLeaderboard) => {
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

  public static draw(match: any, teams: any) {
    teams.forEach((team: IAllLeaderboard) => {
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

  public static goals(match: any, teams: any) {
    teams.forEach((team: IAllLeaderboard) => {
      const oldStats = team;
      if (team.name === match.homeTeam.teamName) {
        oldStats.goalsFavor += match.homeTeamGoals;
        oldStats.goalsOwn += match.awayTeamGoals;
        oldStats.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
      }
      if (team.name === match.awayTeam.teamName) {
        oldStats.goalsFavor += match.awayTeamGoals;
        oldStats.goalsOwn += match.awayTeamGoals;
        oldStats.goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
      }
    });
  }

  public static generateAllLeaderboard(
    matches: MatchesInterface[],
    teamLead: IAllLeaderboard[],
  ) {
    matches.forEach((match: any) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        LeaderboardService.allHomeWin(match, teamLead);
        LeaderboardService.goals(match, teamLead);
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        LeaderboardService.draw(match, teamLead);
        LeaderboardService.goals(match, teamLead);
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        LeaderboardService.allAwayWin(match, teamLead);
        LeaderboardService.goals(match, teamLead);
      }
    });
    return teamLead;
  }
}
