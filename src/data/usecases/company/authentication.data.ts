import {
  BadRequestError,
  UnauthorizedError,
} from '../../../../src/domain/errors';
import { iAuthenticationCompany } from '@/src/domain/usecases/company';
import {
  iHashAdapter,
  iTokenAdapter,
} from '@/src/infra/cryptography/contracts';
import { iCompanyRepository } from '@/src/infra/database/contracts/repositorys';

export class AuthenticationCompanyData implements iAuthenticationCompany {
  constructor(
    private readonly repository: iCompanyRepository,
    private readonly tokenAdapter: iTokenAdapter,
    private readonly hashAdapter: iHashAdapter
  ) {}
  async exec(
    input: iAuthenticationCompany.inputCredentials
  ): Promise<iAuthenticationCompany.AccessCredentials> {
    let companyFounded = await this.repository.findByEmail(input?.email);

    if (!companyFounded) {
      companyFounded = await this.repository.findByCNPJ(input?.cnpj);
    }
    if (!companyFounded) {
      throw new BadRequestError('Account not found.');
    }

    const accessReleased = await this.hashAdapter.compare(
      input.password,
      companyFounded.password
    );

    if (!accessReleased) throw new UnauthorizedError();

    return {
      token: await this.tokenAdapter.createAccessToken({
        _id: companyFounded._id,
      }),
    };
  }
}
