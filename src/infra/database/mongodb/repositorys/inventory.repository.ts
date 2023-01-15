import { Inventory } from "../../../../../src/domain/entities/inventory.entity";
import { Product } from "../../../../domain/entities/sub/product.entity";
import { Collection, ObjectId } from "mongodb";
import { iInventoryRepository } from "../../contracts/repositorys/iInventoryRepository";

export class InventoryRepository implements iInventoryRepository {

    constructor(private readonly Colletion: Collection<Inventory>) {}
    async updateInventory(inventory: Inventory): Promise<Inventory> {
        if (!inventory || !inventory._id)return;

        const currentInventory = await this.findById(inventory._id)
        
        const updatedInventory = new Inventory({
            ...currentInventory,
            products : currentInventory.products,
            updated_at : new Date().toISOString()
        })

        const result = await this.Colletion.updateOne({ _id : currentInventory._id}, updatedInventory)
        if (result.modifiedCount){
            return updatedInventory
        }
    }

    finByCompanyId(company_id: string): Promise<Inventory> {
        return this.Colletion.findOne({ company_id })
    }

    findById(_id: string): Promise<Inventory> {
        return this.Colletion.findOne({ _id })
    }

    async createInventory(inventory: Inventory): Promise<{ _id: string; }> {
        const result = await this.Colletion.insertOne({
            ...inventory,
            _id : new ObjectId().toHexString() as any
        })

        return { _id : result.insertedId.toString()}
    }



    async insertProducts(inventoryId: string, newProducts: Array<Product>): Promise<Array<Product>> {
        if (!newProducts || !newProducts.length) return;

        const products = newProducts.map((product) => {
            return {
                ...product,
                _id : new ObjectId().toString(),
            }
        })

        const result = await this.Colletion.updateOne({ _id : inventoryId}, {
            $push : {products : { $each : products}}
        })

        if (result.matchedCount) {
            return products
        }
    }
}