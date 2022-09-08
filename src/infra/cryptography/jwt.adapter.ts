import { UnauthorizedError } from '../../../src/domain/errors';
import jwt from 'jsonwebtoken';
import { iTokenAdapter } from './contracts';

export class JWTAdapter implements iTokenAdapter {
  constructor(
    private readonly secrectKey: string = process.env.JWT_PW_DEFAULT
  ) {}

  sing(text: string): Promise<string> {
    return Promise.resolve(jwt.sign(text, this.secrectKey));
  }

  verify(hash: string): Promise<any> {
    return Promise.resolve(jwt.verify(hash, this.secrectKey));
  }

  createAccessToken(data: any): Promise<string> {
    const { _id } = data;
    return this.sing(JSON.stringify({ _id }));
  }
}
