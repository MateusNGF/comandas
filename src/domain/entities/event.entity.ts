import { iEntity } from '../contracts/iEntity';
import { ObjectManager } from '../utils';

export class EventEntity extends iEntity {
  public readonly name: string = null;
  public readonly company_id?: string = null;
  public readonly description?: string = null;
  public readonly start_date: Date = null;
  public readonly end_date: Date = null;

  constructor(event: EventEntity) {
    super(event);
    ObjectManager.assing(this, event);
  }
}
