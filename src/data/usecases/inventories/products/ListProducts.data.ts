import { iListProducts } from "@/src/domain/usecases/inventories/products/iListProducts.usecase";
import { iInventoryRepository } from "@/src/infra/database/contracts/repositorys/iInventoryRepository";

export class ListProducts implements iListProducts {
    constructor(private readonly inventoryRepository: iInventoryRepository) {}

    async exec(input: iListProducts.Input): Promise<iListProducts.Output> {
        const { companyId, filters} = input

        const products = await this.inventoryRepository.listProducts(companyId, filters)

        return products
    }
}