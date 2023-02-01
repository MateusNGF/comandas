import { Company } from '../../../../../src/domain/entities';
import { Collection, ObjectId } from 'mongodb';
import { iCompanyRepository } from '../../contracts/repositorys';

export class CompaniesRepository implements iCompanyRepository {
  private readonly projection = {
    omit: {
      projection: {
        password: 0,
      },
    },
  };
  constructor(private readonly Colletion: Collection<Company>) {}
  async findByCNPJ(cnpj: string): Promise<Company> {
    return this.Colletion.findOne({ cnpj });
  }

  async findByEmail(email: string): Promise<Company> {
    return this.Colletion.findOne({ email });
  }
  async findById(_id: string): Promise<Company> {
    return this.Colletion.findOne({ id: _id });
  }

  generateId() {
    return new ObjectId().toHexString();
  }

  async register(company: Company): Promise<{ _id: string }> {
    const _company: Company = {
      ...company,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await this.Colletion.insertOne(_company);
    if (result && result.acknowledged) {
      return { _id: result.insertedId.toString() };
    }
  }
}
