import { ObjectManager } from '../../utils';
import { ItemEntity } from './item.entity';

export class ProductEntity extends ItemEntity {
  public readonly buy_price?: number = 0;
  public readonly quantity?: number = 0;

  constructor(product: ProductEntity) {
    product.type = 'product';
    super(product);
    ObjectManager.assing(this, product);
  }
}

export namespace ProductEntity {
  export const Settings = {
    ...ItemEntity.Settings,
    minBuyPrice: 0,
  };
}


export abstract class ProductOutputReference implements Partial<ProductEntity> {
  public id: any;
  public quantity: number;
}


export abstract class ProductOutputRecord implements Partial<ProductEntity> {
  public id: any;
  public readonly type?: ItemEntity.TypeItens = 'product';
  public quantity: number;
  public name?: string;
  public sale_price?: number;
}
