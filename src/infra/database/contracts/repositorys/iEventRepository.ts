import { EventEntity } from '../../../../../src/domain/entities/event.entity';
import { iListEventsUsecase } from '../../../../../src/domain/usecases/events';
import { iBaseRepository } from './iBaseRepository';

export interface iEventRepository extends iBaseRepository<EventEntity> {
  register(
    event: EventEntity,
    options?: iBaseRepository.Options
  ): Promise<{ id: any }>;
  list(
    companyId: string,
    filters?: iListEventsUsecase.Filters,
    options?: iBaseRepository.Options
  ): Promise<Array<EventEntity>>;
  archive(
    eventId: string,
    company_id: string,
    options?: iBaseRepository.Options
  ): Promise<boolean>;
  unarchive(
    eventId: string,
    company_id: string,
    options?: iBaseRepository.Options
  ): Promise<boolean>;
}
