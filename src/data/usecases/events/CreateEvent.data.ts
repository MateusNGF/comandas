import { iCreateEvent } from '@/src/domain/usecases/events';
import {
  iCompanyRepository,
  iEventRepository,
} from '@/src/infra/database/contracts/repositorys';
import { Event } from '../../../domain/entities';

export class CreateEventData implements iCreateEvent {
  constructor(
    private readonly companyRepository: iCompanyRepository,
    private readonly eventRepository: iEventRepository
  ) {}
  async exec(input: iCreateEvent.input): Promise<iCreateEvent.output> {

    const newEventData = input.event

    const event = new Event({
      company_id: input.companyId,
      name : newEventData.name,
      start_date : newEventData.start_date,
      end_date : newEventData.end_date,
      description : newEventData?.description,
      archived : false,
      created_at : new Date().toISOString(),
      updated_at : new Date().toISOString()
    });

    const createdEvent = await this.eventRepository.register(event);

    if (createdEvent) {
      return {
        _id: createdEvent._id,
        createdAt: event.created_at,
      };
    }
  }
}
