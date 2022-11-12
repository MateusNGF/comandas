import { iController } from "../../../../../src/application/contracts";
import { AuthenticationCompanyController } from "../../../../../src/application/controllers/authentication";
import { makeAuthenticationCompanyUsecase } from "../usecases/authentication.factory";


export const makeAuthenticationCompanyController = (): iController => {
    const usecaseAuthenticationCompany = makeAuthenticationCompanyUsecase();
    return new AuthenticationCompanyController(usecaseAuthenticationCompany);
};