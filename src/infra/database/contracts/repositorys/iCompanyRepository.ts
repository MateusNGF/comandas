import { CompanyEntity } from '../../../../../src/domain/entities/company.entity';
import { iBaseRepository } from './iBaseRepository';

export abstract class iCompanyRepository extends iBaseRepository<CompanyEntity> {
  abstract findByCNPJ(cnpj: string, options ?: iBaseRepository.Options): Promise<CompanyEntity>;
  abstract findByEmail(cnpj: string, options ?: iBaseRepository.Options): Promise<CompanyEntity>;
  abstract register(company: CompanyEntity, options ?: iBaseRepository.Options): Promise<{ _id: string }>;
  abstract generateId(): string;
}

export namespace iCompanyRepository {}
