import { Inventory } from "@/src/domain/entities/inventory.entity";
import { Product } from "@/src/domain/entities/sub/product.entity";
import { iBaseRepository } from "./iBaseRepository";

export interface iInventoryRepository extends iBaseRepository<Inventory> {
    finByCompanyId(companyId : string) : Promise<Inventory>
    createInventory(inventory : Inventory) : Promise<{_id : string}>
    updateInventory(inventory : Inventory) : Promise<Inventory>

    insertProducts(inventoryId : string, products : Array<Product>) : Promise<Array<Product>>
}