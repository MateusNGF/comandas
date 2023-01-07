import {iEntity} from '.'
import { ObjectManager } from '../utils';
export class Product implements iEntity {
    public readonly _id?: any = undefined;

    public readonly name: string = undefined;
    public readonly description?: string = undefined;
    public readonly img_url?: string = undefined;

    public readonly buy_price: number = 0;
    public readonly sale_price?: number = 0;
    public readonly quantity: number = 0;

    public readonly archived?: boolean = false;
  
    public readonly created_at?: string = undefined;
    public readonly updated_at?: string = undefined;
  
    constructor(product: Product) {
      ObjectManager.assing(this, product);
    }
  }