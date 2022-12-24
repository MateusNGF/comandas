import { iController } from "../../../../../src/application/contracts";
import { AuthenticateAndReturnTokenCompanyController } from "../../../../../src/application/controllers/authentication";
import { makeAuthenticatieAndReturnTokenCompanyUsecase } from "../usecases/authentication.factory";


export const makeAuthenticateAndReturnTokenCompanyController = (): iController => {
    const usecaseAuthenticationCompany = makeAuthenticatieAndReturnTokenCompanyUsecase();
    return new AuthenticateAndReturnTokenCompanyController(usecaseAuthenticationCompany);
};