import { AuthenticationCompanyData } from '@src/data/usecases/company';
import { AuthenticationCompany } from '@src/domain/usecases/company/authentication.usecase';

export const makeUseCaseAuthenticationCompany = (): AuthenticationCompany => {
  return new AuthenticationCompanyData();
};
