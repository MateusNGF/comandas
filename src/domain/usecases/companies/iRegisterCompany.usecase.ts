import { iUsecase } from '../../contracts';
import { Company } from '../../entities';

export abstract class iRegisterCompany implements iUsecase {
  abstract exec(
    input: iRegisterCompany.input
  ): Promise<iRegisterCompany.output>;
}

export namespace iRegisterCompany {
  export type input = Company & {password : string};

  export type output = {
    token: string;
  };
}
