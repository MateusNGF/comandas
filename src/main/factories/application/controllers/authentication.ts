import { iController } from "../../../../../src/application/contracts";
import { AuthenticateAndReturnTokenCompanyController } from "../../../../../src/application/controllers/authentication";
import { makeUsecaseAuthenticatieAndReturnTokenCompany } from "../usecases/authentications.factory";


export const makeAuthenticateAndReturnTokenCompanyController = (): iController => {
    const usecaseAuthenticationCompany = makeUsecaseAuthenticatieAndReturnTokenCompany();
    return new AuthenticateAndReturnTokenCompanyController(usecaseAuthenticationCompany);
};