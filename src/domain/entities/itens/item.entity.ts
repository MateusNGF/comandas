import { iEntity } from '../../contracts/iEntity';
import { ObjectManager } from '../../utils';

export abstract class ItemEntity extends iEntity {
  public type?: ItemEntity.TypeItens = 'product';
  public readonly company_id: string = null;
  public readonly name: string = null;
  public readonly description?: string = null;
  public readonly sale_price: number = null;
  public readonly img_url?: string = null;

  constructor(item: ItemEntity) {
    super(item);
    ObjectManager.assing(this, item);
  }
}

export namespace ItemEntity {
  export type TypeItens = 'product' | 'service';

  export const Settings = {
    maxNameLength: 30,
    minNameLength: 2,
    minDescriptionLength: 5,
    maxDescriptionLength: 100,
    minPriceSale: 0,
  };
}
