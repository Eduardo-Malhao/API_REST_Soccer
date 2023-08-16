import { IAllLeaderboard } from '../Interfaces/IAllLeaderboard';

export default class leaderboardSorter {
  public static leaderboardSorter(sortArray: any): IAllLeaderboard[] {
    return sortArray.sort((a: any, b: any) => b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor);
  }
}
