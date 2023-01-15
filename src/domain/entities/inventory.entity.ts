import {iEntity} from '.'
import { ObjectManager } from '../utils';
import { Product } from './product.entity';

export class Inventory implements iEntity {
    public readonly _id?: any = undefined;

    public readonly company_id?: string = undefined;

    public readonly products?: Array<Product> = [];
  
    public readonly created_at?: string = undefined;
    public readonly updated_at?: string = undefined;
  
    constructor(inventory: Inventory) {
      ObjectManager.assing(this, inventory);
    }
  }