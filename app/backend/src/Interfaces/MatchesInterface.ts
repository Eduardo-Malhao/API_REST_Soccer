export default interface MatchesInterface {
  id: number,
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: number;
  homeTeam?: { teamName: string };
  awayTeam?: { teamName: string };
}
