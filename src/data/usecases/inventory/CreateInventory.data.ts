import { Inventory } from '../../../../src/domain/entities/inventory.entity';
import { iCreateInventory } from '../../../../src/domain/usecases/inventory/iCreateInventory.usecase';
import { iCompanyRepository } from '../../../../src/infra/database/contracts/repositorys';
import { iInventoryRepository } from '../../../../src/infra/database/contracts/repositorys/iInventory.repository';
import { DateProvider } from '../../../../src/infra/date/DateProvider.date';

export class CreateInventoryData implements iCreateInventory {
  constructor(
    private readonly inventoryRepository: iInventoryRepository,
    private readonly companyRepository: iCompanyRepository,
  ) {}
  
  async exec(input: iCreateInventory.input): Promise<iCreateInventory.output> {
    const company = await this.companyRepository.findById(input.companyId)
    const currentInventory = await this.inventoryRepository.finByCompanyId(input.companyId)
    if (currentInventory){
      return {
        _id: currentInventory._id,
        createdAt : currentInventory.created_at
      }
    }

    const { inventory } = input

    const newInventory = new Inventory({
      ...inventory,
      company_id : input.companyId,
      created_at : DateProvider().tz(company?.timezone),
      updated_at : DateProvider().tz(company?.timezone)
    })

    const { _id } = await this.inventoryRepository.createInventory(newInventory)

    return { _id, createdAt : newInventory.created_at}
  }
}
