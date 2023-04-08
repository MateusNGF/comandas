import { ObjectManager } from '../../../domain/utils';
import { iArchivateEvent } from '../../../domain/usecases/events';
import { iEventRepository } from '../../../infra/database/contracts/repositorys';
import { iUsecase } from 'src/domain/contracts';

export class ArchivateEventData implements iArchivateEvent {
  constructor(private readonly eventRepository: iEventRepository) {}
  async exec(
    input: iArchivateEvent.input,
    options: iUsecase.Options
  ): Promise<iArchivateEvent.output> {
    const { companyId, eventId, action } = input;

    let eventUpdated = false;

    switch (action) {
      case 'unarchive':
        eventUpdated = await this.eventRepository.unarchive(
          eventId,
          companyId,
          options
        );
        break;
      case 'archive':
        eventUpdated = await this.eventRepository.archive(
          eventId,
          companyId,
          options
        );
    }

    return !!eventUpdated;
  }
}
