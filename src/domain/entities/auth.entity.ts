import { ObjectManager } from '../utils';
import { iEntity } from './itens';

export class AuthenticateEntity extends iEntity {

  public readonly email: string = null;
  public readonly cnpj: string = null;
  public readonly password: string = null;
  public readonly associeteded_id: string = null;

  constructor(auth: AuthenticateEntity) {
    super(auth);
    ObjectManager.assing(this, auth);
  }
}
