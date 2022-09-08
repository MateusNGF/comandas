import { Company } from '@/src/domain/entities';
import { Collection, Filter, FilterOperations, ObjectId } from 'mongodb';
import { iCompanyRepository } from '../../contracts/repositorys';

export class CompanyRepository implements iCompanyRepository {
  private readonly projection = {
    projection: {
      password: 0,
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
    return this.Colletion.findOne(new ObjectId(_id));
  }

  async register(company: Company): Promise<{ _id: string }> {
    const result = await this.Colletion.insertOne(company);
    if (result && result.acknowledged) {
      return { _id: result.insertedId.toString() };
    }
  }
}
