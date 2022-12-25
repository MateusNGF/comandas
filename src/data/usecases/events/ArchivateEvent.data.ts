import { ObjectManager } from "../../../domain/utils";
import { iArchivateEvent } from "../../../domain/usecases/events";
import { iEventRepository } from "../../../infra/database/contracts/repositorys";


export class ArchivateEventData implements iArchivateEvent {
  constructor(
    private readonly eventRepository : iEventRepository
  ){}
  async exec(input: iArchivateEvent.input): Promise<iArchivateEvent.output> {
    ObjectManager.hasKeys(['companyId', 'eventId', 'action'], input)
    const {companyId, eventId, action} = input
    
    let eventUpdated = false;

    switch (action) {
      case "unarchive":
        eventUpdated = await this.eventRepository.unarchive(eventId, companyId)
        break;
      case "archive":
        eventUpdated = await this.eventRepository.archive(eventId, companyId)
    }

    return !!eventUpdated;
  }
}