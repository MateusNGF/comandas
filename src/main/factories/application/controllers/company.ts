import { AccessCompanyController } from '../../../../application/controllers/company';
import { Controller } from '../../../../application/controllers/contracts';

export const makeAccessCompanyController = (): Controller => {
  return new AccessCompanyController();
};
