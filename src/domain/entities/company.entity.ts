import { iEntity } from '.';
import { ObjectManager } from '../utils';

export class Company implements iEntity {
  public readonly _id?: any = undefined;

  public readonly name_fantasy: string = undefined;
  public readonly email: string = undefined;
  public readonly cnpj: string = undefined;
  public readonly timezone: string = undefined;

  public readonly currency?: string = undefined;
  public readonly logo_url?: string = undefined;
  public readonly create_at?: string = undefined;
  public readonly update_at?: string = undefined;

  constructor(company: Company) {
    ObjectManager.assing(this, company);
  }
}

export namespace Company {}
