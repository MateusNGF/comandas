import { iController } from '../../../../application/contracts';
import { AccessCompanyController, RegisterCompanyController } from '../../../../application/controllers/company';
import { makeUseCaseAuthenticationCompany, makeUseCaseRegistrationCompany } from '../usecases/company.factory';

export const makeAccessCompanyController = (): iController => {
  const usecaseAuthenticationCompany = makeUseCaseAuthenticationCompany()
  return new AccessCompanyController(usecaseAuthenticationCompany);
};

export const makeRegisterCompanyController = (): iController => {
  const usecaseRegistrationCompany = makeUseCaseRegistrationCompany()
  return new RegisterCompanyController(usecaseRegistrationCompany)
}
