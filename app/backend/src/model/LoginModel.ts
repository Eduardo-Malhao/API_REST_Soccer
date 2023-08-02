import UsersInterface from '../Interfaces/UsersInterface';
import UsersSequelize from '../database/models/UsersSequelize';

export default class loginModel {
  private model = UsersSequelize;

  async findUser(email: string): Promise<UsersInterface | null> {
    const response = await this.model.findOne({ where: { email } });
    if (!response) return null;
    const ObjBuilder = {
      id: +response.id,
      username: response.username,
      role: response.role,
      email: response.email,
      password: response.password,
    };
    return ObjBuilder;
  }
}
