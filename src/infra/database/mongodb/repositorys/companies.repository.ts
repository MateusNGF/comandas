import { CompanyEntity } from '../../../../../src/domain/entities';
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
  constructor(private readonly Colletion: Collection<CompanyEntity>) {}
  async findByCNPJ(cnpj: string): Promise<CompanyEntity> {
    return this.Colletion.findOne({ cnpj });
  }

  async findByEmail(email: string): Promise<CompanyEntity> {
    return this.Colletion.findOne({ email });
  }
  async findById(_id: string): Promise<CompanyEntity> {
    return this.Colletion.findOne({ id: _id });
  }

  generateId() {
    return new ObjectId().toHexString();
  }

  async register(company: CompanyEntity): Promise<{ _id: string }> {
    const _company: CompanyEntity = {
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
