import { iUsecase } from "src/domain/contracts";
import { iListInventoryUsecase } from "src/domain/usecases/inventory/iListInventory.usecase";
import { iInventoryRepository } from "src/infra/database/contracts/repositorys";

export class ListInvetoryData implements iListInventoryUsecase {
    constructor(
        private readonly inventoryRepository : iInventoryRepository
    ){}
    async exec(input: iListInventoryUsecase.Input, options?: iUsecase.Options): Promise<iListInventoryUsecase.Output> {
        const { company_id, filters } = input
        return await this.inventoryRepository.list(company_id, filters, options)
    }
}