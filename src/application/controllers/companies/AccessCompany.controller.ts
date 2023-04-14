import { UnauthorizedError } from '../../../domain/errors';
import { iAccessCompany } from '../../../../src/domain/usecases/companies';
import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from '../../helpers/http';
import { ObjectManager } from '../../../utils';

export class AccessCompanyController extends iController {
  constructor(private readonly accessCompanyUsecase: iAccessCompany) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      ObjectManager.hasKeys<iAccessCompany.input>(['password'], request.body);

      try {
        ObjectManager.hasKeys<iAccessCompany.input>(['cnpj'], request.body);
      } catch (_) {
        ObjectManager.hasKeys<iAccessCompany.input>(['email'], request.body);
      }

      const authenticatedCompany = await this.accessCompanyUsecase.exec(
        request.body
      );

      if (authenticatedCompany && authenticatedCompany.token) {
        return this.sendSucess(200, authenticatedCompany);
      }

      throw new UnauthorizedError('Login failed.');
    } catch (error) {
      return this.sendError(error);
    }
  }
}
