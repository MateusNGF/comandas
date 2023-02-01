import { ObjectManager } from '../utils';
import { iEntity } from './itens';

export class Auth extends iEntity {

  public readonly email: string = null;
  public readonly cnpj: string = null;
  public readonly password: string = null;
  public readonly associeteded_id: string = null;

  constructor(auth: Auth) {
    super(auth);
    ObjectManager.assing(this, auth);
  }
}
