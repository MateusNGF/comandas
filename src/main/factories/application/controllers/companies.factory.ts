import { iController } from '../../../../application/contracts';
import {
  RegisterCompanyController,
} from '../../../../application/controllers/companies';
import {
  makeUseCaseRegistrationCompany,
} from '../usecases/companies.factory';

export const makeRegisterCompanyController = (): iController => {
  const usecaseRegistrationCompany = makeUseCaseRegistrationCompany();
  return new RegisterCompanyController(usecaseRegistrationCompany);
};
