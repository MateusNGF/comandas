import { ItemEntity, OrderEntity } from 'src/domain/entities';
import { iListInventoryUsecase } from 'src/domain/usecases/inventory/iListInventory.usecase';
import { iCreateOrderUsecase } from 'src/domain/usecases/orders';
import { iBaseRepository } from './iBaseRepository';

export abstract class iInventoryRepository extends iBaseRepository<ItemEntity> {
  abstract create<Item extends ItemEntity = ItemEntity>(
    item: Item,
    options?: iBaseRepository.Options
  ): Promise<{ id: string }>;
  abstract findByName<Item extends ItemEntity = ItemEntity>(
    name: string,
    comapny_id: string,
    options?: iBaseRepository.Options
  ): Promise<Item>;
  abstract list<Item extends ItemEntity = ItemEntity>(
    companyId: string,
    filters?: iListInventoryUsecase.FiltersList,
    options?: iBaseRepository.Options
  ): Promise<Array<Item>>
 
  abstract update<Item extends ItemEntity = ItemEntity>(
    companyId: string, 
    item : Partial<Item>, 
    options?: iBaseRepository.Options
  ): Promise<boolean>
}
