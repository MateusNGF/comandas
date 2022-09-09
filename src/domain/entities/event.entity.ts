import { iEntity } from '.';
import { ObjectManager } from '../utils';

export class Event implements iEntity {
  public readonly _id?: any = undefined;

  public readonly name: string = undefined;
  public readonly company_id?: string = undefined;
  public readonly description?: string = undefined;
  public readonly start_data: string = undefined;
  public readonly end_data: string = undefined;
  public readonly archived?: boolean = false;

  public readonly create_at?: string = undefined;
  public readonly update_at?: string = undefined;

  constructor(event: Event) {
    ObjectManager.assing(this, event);
  }
}
