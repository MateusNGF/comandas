import { HttpResponse } from '@src/application/helpers/http-request';
import { Controller } from '../contracts';

export class AccessCompanyController implements Controller {
  exec(): Promise<HttpResponse> {
    return Promise.resolve({
      status: 200,
      data: {
        mateus: 12
      }
    })
  }
}
