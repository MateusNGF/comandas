import { iRegistrationCompany } from "../../../domain/usecases/company";
import { iController } from "../../contracts";
import { HttpRequest, HttpResponse } from "../../helpers/http";

export class RegisterCompanyController extends iController {

  constructor(
    private readonly UseCase : iRegistrationCompany
  ){super();}
  async exec(request : HttpRequest): Promise<HttpResponse> {
    try {
      
      const company = await this.UseCase.exec(request.body)
      
      return this.sendSucess(200, {...company});
    } catch (error) {
      return this.sendError(error);
    }
  }
}
