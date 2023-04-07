import { Collection, Filter, ObjectId } from 'mongodb';
import { ItemEntity } from '../../../../domain/entities';
import { iListInventoryUsecase } from '../../../../domain/usecases/inventory/iListInventory.usecase';
import { append } from '../../../../domain/utils';
import {
  iBaseRepository,
  iInventoryRepository,
} from '../../contracts/repositorys';

export class InventoryRepository implements iInventoryRepository {
  constructor(private readonly Colletion: Collection<ItemEntity>) {}
  findByName<Item extends ItemEntity = ItemEntity>(
    name: string,
    company_id: string,
    options?: iBaseRepository.Options
  ): Promise<Item> {
    return this.Colletion.findOne<Item>(
      { name , company_id},
      { session: options?.session?.get() }
    );
  }
  async create<Item extends ItemEntity = ItemEntity>(
    item: Item,
    options?: iBaseRepository.Options
  ): Promise<{ id: string }> {
    const id = item.id ? item.id : this.generateId();
    const result = await this.Colletion.insertOne(
      { ...item, id },
      { session: options?.session?.get() }
    );
    if (result && result.acknowledged) {
      return { id };
    }
  }
  generateId(): string {
    return new ObjectId().toHexString();
  }

  findById<Item extends ItemEntity = ItemEntity>(
    id: string,
    options?: iBaseRepository.Options
  ): Promise<Item> {
    return this.Colletion.findOne<Item>(
      { id },
      { session: options?.session?.get() }
    );
  }

  list<Item extends ItemEntity = ItemEntity>(
    companyId: string, 
    filters?: iListInventoryUsecase.FiltersList, 
    options?: iBaseRepository.Options
  ): Promise<Array<Item>> {

    type TypeFilter = Filter<ItemEntity>;
    
    let where: TypeFilter = {company_id: companyId};

    const appendWrere = (cont:TypeFilter) => append(where, cont)

    if (filters) {
      if (filters.id) {
        where = appendWrere({id: filters.id as any})
      }

      if(filters.type){
        where = appendWrere({ type : filters.type })
      }

      if (filters.text) {
        where = appendWrere({ $text : { $search : filters.text}})
      }
    }

    return this.Colletion.find<Item>(where, {
      projection: {
        _id: 0,
      },
      session: options?.session?.get(),
    }).skip(Number(filters.offset) ?? 0).limit(Number(filters.limit) ?? 20).toArray();
  }

  async update<Item extends ItemEntity = ItemEntity>(
    company_id: string,
    item: Partial<Item>,
    options?: iBaseRepository.Options
  ): Promise<boolean> {
    const result = await this.Colletion.updateOne({
      company_id,
      id: item.id
    }, {
      $set: {
        ...item,
        updated_at: new Date()
      }
    }, { session: options?.session?.get() })

    return !!result.modifiedCount
  }
}
