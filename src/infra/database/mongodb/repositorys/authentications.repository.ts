import { AuthenticateEntity } from '../../../../../src/domain/entities';
import { iHashAdapter } from '../../../../../src/infra/cryptography/contracts';
import { Collection, ObjectId } from 'mongodb';
import { iAuthenticationRepository, iBaseRepository } from '../../contracts/repositorys';
import { UpdateAuthenticateDTO } from '../../dtos';

export class AuthenticationsRepository implements iAuthenticationRepository {
  constructor(
    private readonly Colletion: Collection<AuthenticateEntity>,
    private readonly hashAdapter: iHashAdapter
  ) {}

  findById(id: string, options?: iBaseRepository.Options): Promise<AuthenticateEntity> {
    return this.Colletion.findOne({ id }, { session: options?.session?.get() })
  }

  async getAuthByCredentials(credentials: iAuthenticationRepository.BasicCredentials, options ?: iBaseRepository.Options): Promise<AuthenticateEntity> {
    return this.Colletion.findOne({
      $or: [{ email: credentials?.email }, { cnpj: credentials?.cnpj }],
    }, { session : options?.session?.get()});
  }

  async getAuthById(id: string, options ?: iBaseRepository.Options): Promise<AuthenticateEntity> {
    return this.Colletion.findOne({ _id: new ObjectId(id) }, { session : options?.session?.get()});
  }

  async create(auth: AuthenticateEntity, options ?: iBaseRepository.Options): Promise<AuthenticateEntity> {
    auth = {
      ...auth,
      password: await this.hashAdapter.encrypt(auth.password),
    };

    const result = await this.Colletion.insertOne(auth, { session : options?.session?.get() });
    return {
      ...auth,
      id: result.insertedId,
    };
  }

  async update(auth: UpdateAuthenticateDTO, options ?: iBaseRepository.Options): Promise<Boolean> {
    if (!auth.authId) return false;

    const id = auth.authId;
    delete auth.authId;

    if (auth.password) {
      auth.password = await this.hashAdapter.encrypt(auth.password);
    }

    const result = await this.Colletion.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...auth,
          updated_at: new Date(),
        },
      },{
        session : options?.session?.get()
      }
    );

    return Boolean(result.modifiedCount);
  }
}
