import { iUsecase } from '../../contracts';

export abstract class iAuthenticationCompany implements iUsecase {
  abstract exec(
    input: iAuthenticationCompany.input
  ): Promise<iAuthenticationCompany.output>;
}

export namespace iAuthenticationCompany {
  export interface input {
    email?: string;
    cnpj?: string;
    password: string;
  }

  export interface output {
    token: string;
  }
}
