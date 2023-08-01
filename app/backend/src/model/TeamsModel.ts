import TeamsSequelize from '../database/models/TeamsSequelize';
import TeamsInterface from '../Interfaces/TeamsInterface';

export default class teamsModel {
  private model = TeamsSequelize;

  async findAll(): Promise<TeamsInterface[]> {
    const response = await this.model.findAll();
    return response.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: number): Promise<TeamsInterface | null> {
    const response = await this.model.findByPk(id);
    if (!response) return null;
    return response;
  }
}
