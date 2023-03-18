import { CompanyEntity } from '../../../../../src/domain/entities/company.entity';
import { iBaseRepository } from './iBaseRepository';

export interface iCompanyRepository extends iBaseRepository<CompanyEntity> {
  findByCNPJ(cnpj: string): Promise<CompanyEntity>;
  findByEmail(cnpj: string): Promise<CompanyEntity>;
  register(company: CompanyEntity): Promise<{ _id: string }>;
  generateId(): string;
}
