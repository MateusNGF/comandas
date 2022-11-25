import { iUsecase } from '../../contracts';
import { Company } from '../../entities';

export abstract class iRegistrationCompany implements iUsecase {
  abstract exec(
    input: iRegistrationCompany.input
  ): Promise<iRegistrationCompany.output>;
}

export namespace iRegistrationCompany {
  export type input = Company;

  export type output = {
    token: string;
    createdAt: string;
  };
}
