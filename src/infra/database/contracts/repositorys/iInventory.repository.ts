import { Inventory } from "@/src/domain/entities/inventory.entity";
import { Product } from "@/src/domain/entities/product.entity";
import { iBaseRepository } from "./iBaseRepository";

export interface iInventoryRepository extends iBaseRepository<Inventory> {
    finByCompanyId(companyId : string) : Promise<Inventory>
    createInventory(inventory : Inventory) : Promise<{_id : string}>

    removeProductById(_id  :string) : Promise<boolean>
    createProduct(product : Product) : Promise<{ _id : string}>
    updatePrduct(product : Product) : Promise<Product>
    saleProduct(productId  :string, quantity : number) : Promise<Product>
}