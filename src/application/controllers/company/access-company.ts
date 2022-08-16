import { Controller } from '@src/application/contracts';
import { HttpResponse } from '@src/application/helpers/http-request';
import { AuthenticationCompany } from '@src/domain/usecases/company/authentication.usecase';

export class AccessCompanyController implements Controller {
  constructor(
    // private authentication : AuthenticationCompany
  ){}

  exec(): Promise<HttpResponse> {
    return Promise.resolve({ status: 2, data: {} });
  }
}
