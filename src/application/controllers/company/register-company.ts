import { HttpResponse } from '@src/application/helpers/http-request';
import { Controller } from '../contracts';

export class RegisterCompanyController implements Controller {
  exec(HttpRequest: any): Promise<HttpResponse<any>> {
    return Promise.resolve({ status: 2, data: {} });
  }
}
