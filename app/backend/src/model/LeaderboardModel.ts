import MatchesInterface from '../Interfaces/MatchesInterface';
import MatchesSequelize from '../database/models/MatchesSequelize';

export default class loginModel {
  private model = MatchesSequelize;

  async findUser(email: string): Promise<UsersInterface | null> {
    console.log(email);

    const response = await this.model.findOne({ where: { email } });
    if (!response?.dataValues.id) return null;
    console.log(response.dataValues);

    return response;
  }
}
