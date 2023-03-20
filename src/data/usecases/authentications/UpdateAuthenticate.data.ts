import { UpdateAuthenticateDTO } from '../../../../src/infra/database/dtos';
import { BadRequestError } from '../../../../src/domain/errors';
import { iUpdadeAuthenticate } from '../../../../src/domain/usecases/authentications';
import { iAuthenticationRepository } from '../../../../src/infra/database/contracts/repositorys';
import { iUsecase } from 'src/domain/contracts';

export class UpdateAuthenticateData implements iUpdadeAuthenticate {
  constructor(
    private readonly authenticationRepository: iAuthenticationRepository
  ) {}

  async exec(
    input: iUpdadeAuthenticate.input,
    options ?: iUsecase.Options
  ): Promise<Boolean> {
    const { authId } = input;

    const currentAuth = await this.authenticationRepository.getAuthById(authId, options);

    if (!currentAuth) throw new BadRequestError('Account not found.');

    const propsToUpdates: UpdateAuthenticateDTO = { authId };

    if (input.email) propsToUpdates.email = input.email;
    if (input.password) propsToUpdates.password = input.password;

    return await this.authenticationRepository.update(propsToUpdates, options);
  }
}
