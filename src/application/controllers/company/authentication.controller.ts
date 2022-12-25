import { UnauthorizedError } from '../../../domain/errors';
import { iAccessCompany } from '@/src/domain/usecases/company';
import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from '../../helpers/http';

export class AccessCompanyController extends iController {
  constructor(private readonly UseCase: iAccessCompany) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const authenticatedCompany = await this.UseCase.exec(request.body);

      if (authenticatedCompany && authenticatedCompany.token) {
        return this.sendSucess(200, authenticatedCompany);
      }

      throw new UnauthorizedError('Login failed.');
    } catch (error) {
      return this.sendError(error);
    }
  }
}
