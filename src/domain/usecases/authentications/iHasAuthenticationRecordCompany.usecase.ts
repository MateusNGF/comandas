import { iUsecase } from '../../contracts';

export abstract class iHasAuthenticationRecordCompany implements iUsecase {
  abstract exec(
    input: iHasAuthenticationRecordCompany.input,
    options ?: iUsecase.Options
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
