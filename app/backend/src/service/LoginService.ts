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
    console.log(password);
    if (!bcrypt.compareSync(password, foundUser.password)) {
      return { type: 401, message: 'Invalid email or password' };
    }
    const tokenGenerated = jwtUtils.sign({ id: foundUser.id });
    //  readme sem info sobre id
    return { type: 200, message: { token: tokenGenerated } };
  }

  public async findUserRole(id: number) {
    const foundUser = await this.loginModel.findUserRole(id);
    if (!foundUser) {
      return { type: 400, message: 'User not found' };
    }
    return { type: 200, message: { role: foundUser.role } };
  }
}
