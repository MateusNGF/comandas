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

  findById(id: string, options ?: iBaseRepository.Options): Promise<AuthenticateEntity> {
    return this.Colletion.findOne({ id }, { session : options?.session?.get() ?? null})
  }

  async getAuthByCredentials(credentials: {
    email?: string;
    cnpj?: string;
  }, options ?: iBaseRepository.Options): Promise<AuthenticateEntity> {
    return this.Colletion.findOne({
      $or: [{ email: credentials?.email }, { cnpj: credentials?.cnpj }],
    });
  }

  async getAuthById(_id: string): Promise<AuthenticateEntity> {
    return this.Colletion.findOne({ _id: new ObjectId(_id) });
  }

  async create(auth: AuthenticateEntity): Promise<AuthenticateEntity> {
    auth = {
      ...auth,
      password: await this.hashAdapter.encrypt(auth.password),
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await this.Colletion.insertOne(auth);
    return {
      ...auth,
      id: result.insertedId,
    };
  }

  async update(auth: UpdateAuthenticateDTO): Promise<Boolean> {
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
      }
    );

    return Boolean(result.modifiedCount);
  }
}
