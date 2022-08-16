import { Controller } from '@src/application/contracts';
import { AccessCompanyController } from '../../../../application/controllers/company';

export const makeAccessCompanyController = (): Controller => {
  return new AccessCompanyController();
};
