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

  async findById(id: number): Promise<TeamsInterface | null> {
    const response = await this.model.findByPk(id);
    if (!response) return null;
    const ObjBuilder = {
      id: +response.id,
      teamName: response.teamName,
    };
    return ObjBuilder;
  }

  async findAllWithoutId(): Promise<TeamsInterface[]> {
    const response = await this.model.findAll({
      attributes: { exclude: ['id'] },
    });
    return response;
  }
}
