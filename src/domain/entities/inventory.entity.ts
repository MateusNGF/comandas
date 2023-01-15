import { iEntity } from '.';
import { ObjectManager } from '../utils';
import { Product } from './sub/product.entity';

export class Inventory implements iEntity {
  public readonly _id?: any = undefined;

  public readonly company_id?: string = undefined;

  public readonly products?: Array<Product> = [];

  public readonly created_at?: string = new Date().toISOString();
  public readonly updated_at?: string = new Date().toISOString();

  constructor(inventory: Inventory) {
    ObjectManager.assing(this, inventory);
  }
}
