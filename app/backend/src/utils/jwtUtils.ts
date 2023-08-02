import * as jwt from 'jsonwebtoken';

export default class JwtUtils {
  static jwtSecret = process.env.JWT_SECRET || 'secret';

  static sign(payload: string): string {
    return jwt.sign(payload, JwtUtils.jwtSecret);
  }

  static verify(token: string): string | undefined {
    try {
      const splitter = token.split(' ')[1];
      const data = jwt.verify(splitter, JwtUtils.jwtSecret) as string;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
