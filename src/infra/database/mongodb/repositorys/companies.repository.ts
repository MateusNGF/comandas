import { CompanyEntity } from '../../../../../src/domain/entities';
import { Collection, ObjectId } from 'mongodb';
import {
  iBaseRepository,
  iCompanyRepository,
} from '../../contracts/repositorys';

export class CompaniesRepository implements iCompanyRepository {
  constructor(private readonly Colletion: Collection<CompanyEntity>) {}

  async findByCNPJ(
    cnpj: string,
    options?: iBaseRepository.Options
  ): Promise<CompanyEntity> {
    return this.Colletion.findOne(
      { cnpj },
      { session: options?.session?.get() }
    );
  }

  async findByEmail(
    email: string,
    options?: iBaseRepository.Options
  ): Promise<CompanyEntity> {
    return this.Colletion.findOne(
      { email },
      { session: options?.session?.get() }
    );
  }
  async findById(
    id: string,
    options?: iBaseRepository.Options
  ): Promise<CompanyEntity> {
    return this.Colletion.findOne({ id }, { session: options?.session?.get() });
  }

  generateId() {
    return new ObjectId().toHexString();
  }

  async register(
    company: CompanyEntity,
    options?: iBaseRepository.Options
  ): Promise<{ _id: string }> {
    const result = await this.Colletion.insertOne(company, {
      session: options?.session?.get(),
    });
    if (result && result.acknowledged) {
      return { _id: result.insertedId.toString() };
    }
  }
}
