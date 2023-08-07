export interface CreateMatchInterface {
  type: number,
  message: {
    homeTeamId: number;
    homeTeamGoals: number;
    awayTeamId: number;
    awayTeamGoals: number;
    inProgress: boolean;
  }
}
