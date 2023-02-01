import { Inventory } from '../../../domain/entities/inventory.entity';
import { iCreateInventory } from '../../../domain/usecases/inventories/iCreateInventory.usecase';
import { iCompanyRepository } from '../../../infra/database/contracts/repositorys';
import { iInventoryRepository } from '../../../infra/database/contracts/repositorys/iInventoryRepository';
import { DateProvider } from '../../../infra/date/DateProvider.date';

export class CreateInventoryData implements iCreateInventory {
  constructor(
    private readonly inventoryRepository: iInventoryRepository,
    private readonly companyRepository: iCompanyRepository
  ) {}

  async exec(input: iCreateInventory.input): Promise<iCreateInventory.output> {
    const company = await this.companyRepository.findById(input.companyId);
    const currentInventory = await this.inventoryRepository.finByCompanyId(
      input.companyId
    );
    if (currentInventory) {
      return {
        _id: currentInventory.id,
        created_at: currentInventory.created_at,
      };
    }

    const { inventory } = input;

    const newInventory = new Inventory({
      ...inventory,
      company_id: input.companyId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const { _id } = await this.inventoryRepository.createInventory(
      newInventory
    );

    return { _id, created_at: newInventory.created_at };
  }
}
