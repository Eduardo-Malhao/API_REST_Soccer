import * as bcrypt from 'bcryptjs';
import LoginModel from '../model/LoginModel';
import jwtUtils from '../utils/jwtUtils';

export default class LoginService {
  constructor(
    private loginModel: LoginModel = new LoginModel(),
  ) { }

  public async login(email: string, password: string) {
    const foundUser = await this.loginModel.findUser(email);
    if (!foundUser) {
      return { type: 401, message: 'Invalid email or password' };
    }
    if (!bcrypt.compareSync(password, foundUser.password)) {
      return { type: 401, message: 'Invalid email or password' };
    }
    const tokenGenerated = jwtUtils.sign(foundUser.password);
    return { type: 200, message: { token: tokenGenerated } };
  }

  // public async getLogin(authorization: string) {
  // }
}
