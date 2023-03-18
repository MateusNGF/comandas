import { BadRequestError, MissingParamError } from '../../../../src/domain/errors';
import { iCreateEvent } from '../../../../src/domain/usecases/events';

import {
  iCompanyRepository,
  iEventRepository,
} from '../../../../src/infra/database/contracts/repositorys';
import { EventEntity } from '../../../domain/entities';
import { DateProvider } from '../../../../src/infra/date/DateProvider.date';

export class CreateEventData implements iCreateEvent {
  constructor(
    private readonly companyRepository: iCompanyRepository,
    private readonly eventRepository: iEventRepository
  ) {}
  async exec(input: iCreateEvent.input): Promise<iCreateEvent.output> {
    const event = input.event;

    if (!input.companyId) throw new MissingParamError('companyId')
    if (!input.event) throw new MissingParamError('event')

    const company = await this.companyRepository.findById(input.companyId);
    if (!company) throw new BadRequestError('Company not found.');

    if (DateProvider(event.start_date).isAfter(event.end_date)) {
      throw new BadRequestError(
        'The start date cannot be equal to or after the end date of the event.'
      );
    }

    const newEvent = new EventEntity({
      company_id: input.companyId,
      name: event.name,
      start_date: DateProvider(event.start_date).tz(company?.timezone),
      end_date: DateProvider(event.end_date).tz(company?.timezone),
      description: event?.description
    });

    const createdEvent = await this.eventRepository.register(newEvent);

    if (createdEvent) {
      return {
        _id: createdEvent._id,
        created_at: event.created_at,
      };
    }
  }
}
