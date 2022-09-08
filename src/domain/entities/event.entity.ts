import { iEntity } from '.';
import { ObjectManager } from '../utils';

export class Event implements iEntity {
  public readonly _id?: string = undefined;

  public readonly name: string = undefined;
  public readonly company_id?: string = undefined;
  public readonly description?: string = undefined;
  public readonly startData: string = undefined;
  public readonly endData: string = undefined;

  public readonly createAt?: string = undefined;
  public readonly updateAt?: string = undefined;

  constructor(event: Event) {
    ObjectManager.assing(this, event);
  }
}
