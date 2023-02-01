import { ObjectManager } from '../utils';
import { iEntity } from './itens';
import { Product } from './itens/product.entity';

export class Inventory extends iEntity {

  public readonly company_id?: string = undefined;
  public readonly products?: Array<Product> = [];

  constructor(inventory: Inventory) {
    super(inventory);
    ObjectManager.assing(this, inventory);
  }
}
