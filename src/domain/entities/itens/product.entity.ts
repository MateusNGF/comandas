import { ObjectManager } from '../../utils';
import { iEntity } from '.';

export class Product extends iEntity {
  public readonly name: string = undefined;
  public readonly description?: string = undefined;
  public readonly img_url?: string = undefined;

  public readonly buy_price: number = 0;
  public readonly sale_price?: number = 0;
  public readonly quantity: number = 0;

  public readonly archived?: boolean = false;

  constructor(product: Product) {
    super(product)
    ObjectManager.assing(this, product);
  }
}
