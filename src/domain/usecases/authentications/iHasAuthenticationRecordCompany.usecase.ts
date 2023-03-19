import { iUsecase } from '../../contracts';

export abstract class iHasAuthenticationRecordCompany extends iUsecase {
  abstract exec(
    input: iHasAuthenticationRecordCompany.input
  ): Promise<iHasAuthenticationRecordCompany.output>;
}

export namespace iHasAuthenticationRecordCompany {
  export type input = {
    email?: string;
    cnpj?: string;
    password?: string;
  };

  export type output = { token: string };
}
