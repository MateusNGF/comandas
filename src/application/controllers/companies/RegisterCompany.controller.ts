import { ObjectManager } from '../../../domain/utils';
import { iRegisterCompany } from '../../../domain/usecases/companies';
import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from '../../helpers/http';

export class RegisterCompanyController extends iController {
  constructor(private readonly registrationCompanyUsercase: iRegisterCompany) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const incomingCompany = request.body;

      ObjectManager.hasKeys<iRegisterCompany.input>(
        ['name_fantasy', 'email', 'cnpj', 'timezone', 'password'],
        incomingCompany
      );

      const companyRecord = await this.registrationCompanyUsercase.exec(
        incomingCompany
      );

      return this.sendSucess(200, { ...companyRecord });
    } catch (error) {
      return this.sendError(error);
    }
  }
}
