import { iEntity } from '.';
import { ObjectManager } from '../utils';

export class Auth implements iEntity {
  public readonly _id?: any = undefined;

  public readonly email: string = undefined;
  public readonly cnpj: string = undefined;
  public readonly password: string = undefined;
  public readonly associeteded_id: string = undefined;

  public readonly create_at?: string = undefined;
  public readonly update_at?: string = undefined;

  constructor(auth: Auth) {
    ObjectManager.assing(this, auth);
  }
}
