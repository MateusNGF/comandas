import { iEntity } from '.';
import { ObjectManager } from '../utils';

export class Company implements iEntity {
  public readonly _id?: string = undefined;

  public readonly name_fantasy: string = undefined;
  public readonly email: string = undefined;
  public readonly cnpj: string = undefined;
  public readonly password: string = undefined;

  public readonly createAt?: string = undefined;
  public readonly updateAt?: string = undefined;

  constructor(company: Company) {
    ObjectManager.assing(this, company);
  }
}

export namespace Company {}
