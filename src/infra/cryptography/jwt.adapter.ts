import jwt from 'jsonwebtoken';
import { iTokenAdapter } from './contracts';

export class JWTAdapter implements iTokenAdapter {
  constructor(
    private readonly secrectKey: string = process.env.JWT_PW_DEFAULT,
    private readonly expiresIn: string = process.env.JWT_EXPIRE_DEFAULT,
  ) {}

  sing<T=any>(content: T, options ?: iTokenAdapter.options): Promise<string> {
    const makeToken = (data) => {
      return jwt.sign(
        data,
        options.secretKey ?? this.secrectKey,
        {
          expiresIn: options.expireIn ?? this.expiresIn
        }
      )
    }


    switch (typeof content) {
      case 'string':
        return Promise.resolve(makeToken(content));
      case 'object':
        return Promise.resolve(makeToken(JSON.stringify(content)));
    }
    
  }

  verify(hash: string, secret = this.secrectKey): Promise<any> {
    return Promise.resolve(jwt.verify(hash, secret));
  }

  createAccessToken(data: any): Promise<string> {
    return this.sing(JSON.stringify(data));
  }
}
