import jwt from 'jsonwebtoken';
import { iTokenAdapter } from './contracts';

export class JWTAdapter implements iTokenAdapter {
  constructor(
    private readonly secrectKey: string = process.env.JWT_PW_TOKEN_AUTH
  ) {}

  sing(text: string, secret = this.secrectKey): Promise<string> {
    return Promise.resolve(jwt.sign(text, secret));
  }

  verify(hash: string, secret = this.secrectKey): Promise<any> {
    return Promise.resolve(jwt.verify(hash, secret));
  }

  createAccessToken(data: any): Promise<string> {
    return this.sing(JSON.stringify(data));
  }
}
