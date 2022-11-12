import { iController } from '../../../../application/contracts';
import {
  RegisterCompanyController,
} from '../../../../application/controllers/company';
import {
  makeUseCaseRegistrationCompany,
} from '../usecases/company.factory';

export const makeRegisterCompanyController = (): iController => {
  const usecaseRegistrationCompany = makeUseCaseRegistrationCompany();
  return new RegisterCompanyController(usecaseRegistrationCompany);
};
