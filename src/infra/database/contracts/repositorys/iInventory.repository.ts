import { ItemEntity } from 'src/domain/entities';
import { iListInventoryUsecase } from 'src/domain/usecases/inventory/iListInventory.usecase';
import { iBaseRepository } from './iBaseRepository';

export interface iInventoryRepository extends iBaseRepository<ItemEntity> {
  create<Item extends ItemEntity = ItemEntity>(
    item: Item,
    options?: iBaseRepository.Options
  ): Promise<{ id: string }>;
  findByName<Item extends ItemEntity = ItemEntity>(
    name: string,
    comapny_id: string,
    options?: iBaseRepository.Options
  ): Promise<Item>;
  list<Item extends ItemEntity = ItemEntity>(    
    companyId: string,
    filters?: iListInventoryUsecase.FiltersList,
    options?: iBaseRepository.Options
  ): Promise<Array<Item>>
}
