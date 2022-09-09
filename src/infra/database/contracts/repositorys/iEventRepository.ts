import { Event } from '@/src/domain/entities';
import { iBaseRepository } from '.';

export interface iEventRepository extends iBaseRepository<Event> {
  register(event: Event): Promise<{
    _id: string;
  }>;
  archive(eventId : string, companyId : string) : Promise<boolean>
}
