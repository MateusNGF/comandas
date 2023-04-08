import { iEntity } from '../../contracts/iEntity';
import { ObjectManager } from '../../utils';

export abstract class ItemCompany extends iEntity {
  public type?: ItemCompany.TypeItens = 'product';
  public readonly company_id: string = null;
  public readonly name: string = null;
  public readonly description?: string = null;
  public readonly sale_price: number = null;
  public readonly img_url?: string = null;

  constructor(item: ItemCompany) {
    super(item);
    ObjectManager.assing(this, item);
  }
}

export namespace ItemCompany {
  export type TypeItens = 'product' | 'service';
}
