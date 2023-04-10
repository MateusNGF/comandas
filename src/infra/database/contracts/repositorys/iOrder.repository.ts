import { iListEventsUsecase } from 'src/domain/usecases/events';
import { ItemEntity, OrderEntity } from '../../../../domain/entities';
import { iBaseRepository } from './iBaseRepository';
import { BooleanArraySupportOption } from 'prettier';

export interface iOrderRepository extends iBaseRepository<OrderEntity> {
  create(
    order: OrderEntity,
    options?: iBaseRepository.Options
  ): Promise<{ id: string }>;
  list(
    company_id: string,
    filters: iListEventsUsecase.Filters,
    options?: iBaseRepository.Options
  ): Promise<Array<OrderEntity>>;
  update(
    order: OrderEntity,
    options?: iBaseRepository.Options
  ) : Promise<OrderEntity>
}
