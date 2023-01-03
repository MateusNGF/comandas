import { Event } from "@/src/domain/entities/event.entity";
import { iBaseRepository } from "./iBaseRepository";


export interface iEventRepository extends iBaseRepository<Event> {
  register(event: Event): Promise<{_id: any}>;
  list(companyId : string) : Promise<Array<Event>>;
  archive(eventId : string, company_id : string) : Promise<boolean>
  unarchive(eventId : string, company_id : string) : Promise<boolean>
}
