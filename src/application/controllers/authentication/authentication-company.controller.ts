import { UnauthorizedError } from '../../../domain/errors';
import { iAuthenticationCompany } from '@/src/domain/usecases/authentication';
import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from '../../helpers/http';

export class AuthenticationCompanyController extends iController {
  constructor(private readonly authenticationCompanyUsercase: iAuthenticationCompany) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const authenticatedCompany = await this.authenticationCompanyUsercase.exec(request.body);

      if (authenticatedCompany && authenticatedCompany.token) {
        return this.sendSucess(200, authenticatedCompany);
      }

      throw new UnauthorizedError('Login failed.');
    } catch (error) {
      return this.sendError(error);
    }
  }
}
