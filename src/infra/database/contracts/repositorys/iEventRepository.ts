import { EventEntity } from '../../../../../src/domain/entities/event.entity';
import { iListEvents } from '../../../../../src/domain/usecases/events';
import { iBaseRepository } from './iBaseRepository';

export interface iEventRepository extends iBaseRepository<EventEntity> {
  register(event: EventEntity): Promise<{ _id: any }>;
  list(companyId: string, filters?: iListEvents.Filters): Promise<Array<EventEntity>>;
  archive(eventId: string, company_id: string): Promise<boolean>;
  unarchive(eventId: string, company_id: string): Promise<boolean>;
}
