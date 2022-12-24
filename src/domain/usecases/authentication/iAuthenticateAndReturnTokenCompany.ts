import { iUsecase } from '../../contracts';

export abstract class iAuthenticationAndReturnTokenCompany implements iUsecase {
  abstract exec(
    input: iAuthenticationAndReturnTokenCompany.input
  ): Promise<iAuthenticationAndReturnTokenCompany.output>;
}

export namespace iAuthenticationAndReturnTokenCompany {
  export interface input {
    email?: string;
    cnpj?: string;
    password: string;
  }

  export interface output {
    token: string;
  }
}
