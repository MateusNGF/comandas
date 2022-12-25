import { iUsecase } from '../../contracts';
import { UnauthorizedError } from '../../errors';

export abstract class iHasAuthenticationRecordCompany implements iUsecase {
  abstract exec(
    input: iHasAuthenticationRecordCompany.input
  ): Promise<iHasAuthenticationRecordCompany.output>;
}

export namespace iHasAuthenticationRecordCompany {
  export interface input {
    email?: string;
    cnpj?: string;
  }

  export type output = UnauthorizedError | void
}
