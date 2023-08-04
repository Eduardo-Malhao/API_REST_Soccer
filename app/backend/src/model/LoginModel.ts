import UsersInterface from '../Interfaces/UsersInterface';
import UsersSequelize from '../database/models/UsersSequelize';

export default class loginModel {
  private model = UsersSequelize;

  async findUser(email: string): Promise<UsersInterface | null> {
    console.log(email);

    const response = await this.model.findOne({ where: { email } });
    if (!response?.dataValues.id) return null;
    console.log(response.dataValues);

    return response;
  }

  async findUserRole(id: number): Promise<UsersInterface | null> {
    const response = await this.model.findOne({ where: { id } });
    if (!response) return null;
    return response.dataValues;
  }
}
