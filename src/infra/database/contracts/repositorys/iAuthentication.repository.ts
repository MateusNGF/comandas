import { AuthenticateEntity } from '../../../../../src/domain/entities/auth.entity';
import { UpdateAuthenticateDTO } from '../../dtos';
import { iBaseRepository } from './iBaseRepository';

export abstract class iAuthenticationRepository extends iBaseRepository<AuthenticateEntity> {
  abstract getAuthByCredentials(credentials: iAuthenticationRepository.BasicCredentials, options?: iBaseRepository.Options): Promise<AuthenticateEntity>;
  abstract getAuthById(id: string, options?: iBaseRepository.Options): Promise<AuthenticateEntity>;
  abstract create(auth: AuthenticateEntity, options?: iBaseRepository.Options): Promise<AuthenticateEntity>;
  abstract update(auth: UpdateAuthenticateDTO, options?: iBaseRepository.Options): Promise<Boolean>;
}

export namespace iAuthenticationRepository {
  export type BasicCredentials = { 
    email?: string; 
    cnpj?: string 
  };
}
