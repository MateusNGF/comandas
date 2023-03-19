import { iUsecase } from '../../contracts';
import { CompanyEntity } from '../../entities';

export abstract class iRegisterCompany implements iUsecase {
  abstract exec(
    input: iRegisterCompany.input
  ): Promise<iRegisterCompany.output>;
}

export namespace iRegisterCompany {
  export type input = CompanyEntity & { password: string };

  export type output = {
    token: string;
  };
}
