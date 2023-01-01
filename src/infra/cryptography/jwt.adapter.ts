import jwt from 'jsonwebtoken';
import { iTokenAdapter } from './contracts';

export class JWTAdapter implements iTokenAdapter {
  constructor(
    private readonly secrectKey: string = process.env.JWT_PW_TOKEN_AUTH
  ) {}

  sing<T=any>(content: T, secret = this.secrectKey): Promise<string> {
    switch (typeof content) {
      case 'string':
        return Promise.resolve(jwt.sign(content, secret));
      case 'object':
        return Promise.resolve(jwt.sign(JSON.stringify(content), secret));
    }
    
  }

  verify(hash: string, secret = this.secrectKey): Promise<any> {
    return Promise.resolve(jwt.verify(hash, secret));
  }

  createAccessToken(data: any): Promise<string> {
    return this.sing(JSON.stringify(data));
  }
}
