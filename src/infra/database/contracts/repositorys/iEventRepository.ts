import { Event } from '@/src/domain/entities';
import { iBaseRepository } from '.';

export interface iEventRepository extends iBaseRepository<Event> {
  register(event: Event): Promise<{
    _id: any;
  }>;
  archive(eventId : string, company_id : string) : Promise<boolean>
  unarchive(eventId : string, company_id : string) : Promise<boolean>
}
