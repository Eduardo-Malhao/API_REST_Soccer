import { LeaderboardInterface } from '../Interfaces/LeaderboardInterface';

export default class leaderboardSorter {
  public static leaderboardSorter(a: LeaderboardInterface, b: LeaderboardInterface) {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints; // Ordena por total de pontos decrescente
    } if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories; // Em caso de empate, ordena por total de vitórias decrescente
    } if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance; // Em caso de empate, ordena por saldo de gols decrescente
    }
    return b.goalsFavor - a.goalsFavor; // Em caso de empate, ordena por gols a favor decrescente
  }
}
