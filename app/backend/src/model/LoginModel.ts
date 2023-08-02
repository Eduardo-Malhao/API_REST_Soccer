import TeamsSequelize from '../database/models/TeamsSequelize';
import TeamsInterface from '../Interfaces/TeamsInterface';

export default class teamsModel {
  private model = TeamsSequelize;

  async findAll(): Promise<TeamsInterface[]> {
    const response = await this.model.findAll();
    const ObjBuilder = response.map(({ id, teamName }) => (
      { id: +id, teamName }
    ));
    return ObjBuilder;
  }
}
