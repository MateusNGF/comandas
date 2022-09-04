import { iUsecase } from "../../contracts";

export abstract class iAuthenticationCompany implements iUsecase {
  abstract exec(
    input: iAuthenticationCompany.inputCredentials
  ): Promise<iAuthenticationCompany.AccessCredentials>;
}

export namespace iAuthenticationCompany {
  export interface inputCredentials {
    email ?: string;
    cnpj ?: string;
    password: string;
  }

  export interface AccessCredentials {
    token: string;
  }
}
