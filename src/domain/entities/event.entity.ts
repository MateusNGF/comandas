import { ObjectManager } from '../utils';
import { iEntity } from './itens';

export class Event extends iEntity {

  public readonly name: string = null;
  public readonly company_id?: string = null;
  public readonly description?: string = null;
  public readonly start_date: Date = null;
  public readonly end_date: Date = null;


  constructor(event: Event) {
    super(event);
    ObjectManager.assing(this, event);
  }
}
