import { Company } from '@/src/domain/entities';
import { iBaseRepository } from '.';

export interface iCompanyRepository extends iBaseRepository<Company> {
  findByCNPJ(cnpj: string): Promise<Company>;
  findByEmail(cnpj: string): Promise<Company>;
  register(company: Company): Promise<{ _id: string }>;
}
