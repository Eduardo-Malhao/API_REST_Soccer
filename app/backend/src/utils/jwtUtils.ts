import * as jwt from 'jsonwebtoken';
import { Identifiable } from '../Interfaces/index';

export default class JwtUtils {
  static jwtSecret = process.env.JWT_SECRET || 'secret';

  static sign(payload: Identifiable): string {
    return jwt.sign(payload, JwtUtils.jwtSecret);
  }

  static verify(token: string): Identifiable | undefined {
    try {
      const data = jwt.verify(token, JwtUtils.jwtSecret) as Identifiable;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
