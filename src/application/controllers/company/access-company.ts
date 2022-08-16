import { Controller } from "src/application/contracts";
import { HttpResponse } from "src/application/helpers/http-request";

export class AccessCompanyController implements Controller {

  async exec(): Promise<HttpResponse> {
    return Promise.resolve({ status: 200, data: { token : "valid token"} });
  }
}
