import { Company } from '../../../../src/domain/entities/company.entity';
import { iBaseRepository } from './iBaseRepository';

export interface iCompanyRepository extends iBaseRepository<Company> {
  findByCNPJ(cnpj: string): Promise<Company>;
  findByEmail(cnpj: string): Promise<Company>;
  register(company: Company): Promise<{ _id: string }>;
  generateId(): string;
}
