import { Controller } from 'src/application/contracts';
import { HttpResponse } from 'src/application/helpers/http-request';

export class AccessCompanyController extends Controller {
  async exec(): Promise<HttpResponse> {
    try {
      return Promise.resolve(this.sendSucess(200, { token: 'valid token' }));
    } catch (error) {
      return this.sendError(error);
    }
  }
}
