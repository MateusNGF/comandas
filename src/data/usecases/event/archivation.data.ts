import { ObjectManager } from "../../../../src/domain/utils";
import { iArchivationEvent } from "../../../../src/domain/usecases/events";
import { iEventRepository } from "../../../../src/infra/database/contracts/repositorys";


export class ArchivationEventData implements iArchivationEvent {
  constructor(
    private readonly eventRepository : iEventRepository
  ){}
  async exec(input: iArchivationEvent.input): Promise<iArchivationEvent.output> {
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