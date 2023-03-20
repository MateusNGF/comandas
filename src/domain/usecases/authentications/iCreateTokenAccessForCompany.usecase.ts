import { iUsecase } from '../../contracts';

export abstract class iCreateTokenForCompany implements iUsecase {
  abstract exec(
    input: iCreateTokenForCompany.input,
    options?: iUsecase.Options
  ): Promise<iCreateTokenForCompany.output>;
}

export namespace iCreateTokenForCompany {
  export type input = {
    companyId: string;
  };

  export type output = {
    token: string;
  };
}
