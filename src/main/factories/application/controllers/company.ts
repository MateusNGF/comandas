import { Controller } from '../../../../application/contracts';
import { AccessCompanyController, RegisterCompanyController } from '../../../../application/controllers/company';

export const makeAccessCompanyController = (): Controller => {
  return new AccessCompanyController();
};

export const makeRegisterCompanyController = (): Controller => {
  return new RegisterCompanyController()
}
