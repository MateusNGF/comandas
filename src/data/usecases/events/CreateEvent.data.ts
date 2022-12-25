import {
  UnauthorizedError,
} from '../../../domain/errors';
import { iCreateEvent } from '@/src/domain/usecases/events';
import {
  iCompanyRepository,
  iEventRepository,
} from '@/src/infra/database/contracts/repositorys';
import { Event } from '../../../domain/entities';
import { ObjectManager } from '../../../domain/utils';

export class CreateEventData implements iCreateEvent {
  constructor(
    private readonly companyRepository: iCompanyRepository,
    private readonly eventRepository: iEventRepository
  ) {}
  async exec(input: iCreateEvent.input): Promise<iCreateEvent.output> {
    // if (!input.companyId) throw new UnauthorizedError('CompanyId required.');
    // if (!input.event) throw new MissingParamError('Missing event.');
    
    ObjectManager.hasKeys(['companyId', 'event'], input)
    ObjectManager.hasKeys(['name', 'start_data', 'end_data'], input.event);
    
    if (!(await this.companyRepository.findById(input.companyId)))
      throw new UnauthorizedError('Company not found.');


    const event = new Event({
      company_id: input.companyId,
      ...input.event,
      create_at : new Date().toISOString(),
      update_at : new Date().toISOString()
    });

    const createdEvent = await this.eventRepository.register(event);

    if (createdEvent) {
      return {
        _id: createdEvent._id,
        createdAt: event.create_at,
      };
    }
  }
}
