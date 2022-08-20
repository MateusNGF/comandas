import { Controller } from "../../contracts";
import { HttpResponse } from "../../helpers/http-request";

export class RegisterCompanyController extends Controller {
  async exec(): Promise<HttpResponse> {
    try {
      return this.sendSucess(200, { ok : 1, token: 'valid token' });
    } catch (error) {
      return this.sendError(error);
    }
  }
}
