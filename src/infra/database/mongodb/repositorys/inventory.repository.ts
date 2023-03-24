import { Collection, ObjectId } from "mongodb";
import { ItemEntity } from "src/domain/entities";
import { iBaseRepository, iInventoryRepository } from "../../contracts/repositorys";



export class InventoryRepository implements iInventoryRepository {
    constructor(private readonly Colletion: Collection<ItemEntity>) {}
    findByName<Item extends ItemEntity = ItemEntity>(name: string, company_id: string, options?: iBaseRepository.Options): Promise<Item> {
        return this.Colletion.findOne<Item>({ $text : { $search: name }, company_id}, { session : options?.session?.get() })
    }
    async create<Item extends ItemEntity = ItemEntity>(item: Item, options?: iBaseRepository.Options): Promise<{ id: string; }> {
        const id = item.id ? item.id : this.generateId()
        const result = await this.Colletion.insertOne({...item, id}, { session : options?.session?.get()})
        if (result && result.acknowledged){
            return { id }
        }
    }
    generateId(): string {
        return new ObjectId().toHexString()
    }

    findById<Item extends ItemEntity = ItemEntity>(id: string, options?: iBaseRepository.Options): Promise<Item> {
        return this.Colletion.findOne<Item>({ id }, { session : options?.session?.get()})
    }
}