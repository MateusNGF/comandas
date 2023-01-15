import { Auth } from '@/src/domain/entities/auth.entity';
import { UpdateAuthenticateDTO } from '../../dtos';

type BasicCredentials = { email?: string; cnpj?: string };

export interface iAuthenticationRepository {
  getAuthByCredentials(credentials: BasicCredentials): Promise<Auth>;
  getAuthById(_id: string): Promise<Auth>;
  create(auth: Auth): Promise<Auth>;
  update(auth: UpdateAuthenticateDTO): Promise<Boolean>;
}
