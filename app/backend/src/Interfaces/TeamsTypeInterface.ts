export default interface TeamsTypeInterface {
  type: number,
  message: string | { id?: number, teamName: string };
}
