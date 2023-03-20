import { ObjectManager } from '../../utils';
import { ItemCompany } from './item.entity';

export class Product extends ItemCompany {
  public readonly buy_price?: number = 0;
  public readonly quantity?: number = 0;

  constructor(product: Product) {
    product.type = 'product';
    super(product);
    ObjectManager.assing(this, product);
  }
}
