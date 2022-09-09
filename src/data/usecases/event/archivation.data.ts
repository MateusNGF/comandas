import { ObjectManager } from "../../../../src/domain/utils";
import { UnauthorizedError } from "../../../../src/domain/errors";
import { iArchivationEvent } from "../../../../src/domain/usecases/events";
import { iEventRepository } from "../../../../src/infra/database/contracts/repositorys";


export class ArchivationEventData implements iArchivationEvent {
  constructor(
    private readonly eventRepository : iEventRepository
  ){}
  async exec(input: iArchivationEvent.input): Promise<iArchivationEvent.output> {
    ObjectManager.hasKeys(['companyId', 'eventId'], input)
    const {companyId, eventId} = input

    const archived = await this.eventRepository.archive(eventId, companyId)
    if (archived) return {archived}
  }
}