import { iUsecase } from '../../contracts';

export abstract class iAccessCompany implements iUsecase {
  abstract exec(input: iAccessCompany.input): Promise<iAccessCompany.output>;
}

export namespace iAccessCompany {
  export interface input {
    email?: string;
    cnpj?: string;
    password: string;
  }

  export interface output {
    token: string;
  }
}
