import { ObjectManager } from '../utils';
import { iEntity } from './itens';

export class CompanyEntity extends iEntity {

  public readonly name_fantasy: string = null;
  public readonly email: string = null;
  public readonly cnpj: string = null;
  public readonly timezone: string = null;

  public readonly currency?: string = null;
  public readonly logo_url?: string = null;

  constructor(company: CompanyEntity) {
    super(company);
    ObjectManager.assing(this, company);
  }
}

export namespace Company {}
