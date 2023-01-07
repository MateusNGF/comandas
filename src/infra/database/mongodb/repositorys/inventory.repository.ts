import { Inventory } from "@/src/domain/entities/inventory.entity";
import { Product } from "@/src/domain/entities/product.entity";
import { Collection, ObjectId } from "mongodb";
import { iInventoryRepository } from "../../contracts/repositorys/iInventory.repository";

export class InventoryRepository implements iInventoryRepository {

    constructor(private readonly Colletion: Collection<Inventory>) {}

    finByCompanyId(company_id: string): Promise<Inventory> {
        return this.Colletion.findOne({ company_id })
    }
    async createInventory(inventory: Inventory): Promise<{ _id: string; }> {
        const result = await this.Colletion.insertOne({
            ...inventory,
            _id : new ObjectId().toHexString() as any
        })

        return { _id : result.insertedId.toString()}
    }
    removeProductById(_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    createProduct(product: Product): Promise<{ _id: string; }> {
        throw new Error("Method not implemented.");
    }
    updatePrduct(product: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    saleProduct(productId: string, quantity: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    findById(_id: string): Promise<Inventory> {
        throw new Error("Method not implemented.");
    }
}