import { Company } from '@/src/domain/entities';
import { ClientSession, Collection, ObjectId } from 'mongodb';
import { iCompanyRepository } from '../../contracts/repositorys';

export class CompanyRepository implements iCompanyRepository {
  private readonly projection = {
    omit : {
      projection: {
        password: 0,
      },
    }
  };
  constructor(
    private readonly Colletion: Collection<Company>,
  ) { }
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

    const _company: Company = {
      ...company,
      create_at: new Date().toISOString(),
      update_at: new Date().toISOString()
    }

    const result = await this.Colletion.insertOne(_company);
    if (result && result.acknowledged) {
      return { _id: result.insertedId.toString() };
    }
  }
}
