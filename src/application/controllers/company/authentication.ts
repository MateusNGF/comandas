import { UnauthorizedError } from "../../../../src/domain/errors";
import { iAuthenticationCompany } from "@/src/domain/usecases/company";
import { iController } from "../../contracts";
import { HttpRequest, HttpResponse } from "../../helpers/http-request";

export class AccessCompanyController extends iController {


  constructor(
    private readonly UseCase : iAuthenticationCompany
  ){super();}
  async exec(request : HttpRequest): Promise<HttpResponse> {
    try {

      const authenticatedCompany = await this.UseCase.exec(request.body)
      
      if (authenticatedCompany && authenticatedCompany.token){
        return this.sendSucess(200, authenticatedCompany)
      }

      throw new UnauthorizedError("Login failed.")
    } catch (error) {
      return this.sendError(error);
    }
  }
}
