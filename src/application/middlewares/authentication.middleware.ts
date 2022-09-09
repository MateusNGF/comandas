import { UnauthorizedError } from '../../domain/errors';
import { iTokenAdapter } from '../../infra/cryptography/contracts';
import { HttpRequest, HttpResponse } from '../helpers/http';
import { iMiddleware } from '../contracts/iMiddleware';

export class AuthenticationMiddleware extends iMiddleware {
  constructor(private readonly tokenAdapter: iTokenAdapter) {
    super();
  }

  async run(request: HttpRequest): Promise<HttpResponse> {
    const token = request.headers['x-access-token'];
    try {
      if (!token) throw new UnauthorizedError('Token required.');
      const payload = await this.tokenAdapter.verify(token);
      return this.sendSucess(payload);
    } catch (e) {
      console.log(e);

      return this.sendError(new UnauthorizedError(e.message));
    }
  }
}
