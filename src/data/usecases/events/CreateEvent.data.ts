import {
  BadRequestError,
} from '../../../../src/domain/errors';
import { iCreateEvent } from '../../../../src/domain/usecases/events';

import {
  iCompanyRepository,
  iEventRepository,
} from '../../../../src/infra/database/contracts/repositorys';
import { EventEntity } from '../../../domain/entities';
import { DateProvider } from '../../../../src/infra/date/DateProvider.date';
import { iUsecase } from 'src/domain/contracts';
import { iDatabase } from 'src/infra/database/contracts';

export class CreateEventData implements iCreateEvent {
  constructor(
    private readonly sessionDatabase: iDatabase.iSession,
    private readonly companyRepository: iCompanyRepository,
    private readonly eventRepository: iEventRepository
  ) {}
  async exec(
    input: iCreateEvent.input
  ): Promise<iCreateEvent.output> {

    const session = this.sessionDatabase.startSession()

    try {
      session.initTransaction();

      const event = input.event;

      const company = await this.companyRepository.findById(
        input.companyId,
        { session }
      );
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
        description: event?.description,
      });

      const createdEvent = await this.eventRepository.register(newEvent, { session });

      await session.commitTransaction()
      if (createdEvent) {
        return {
          id: createdEvent.id,
          created_at: event.created_at,
        };
      }
    } catch (error) {
      await session.rollbackTransaction();
      throw error
    } finally {
      await session.endSession()
    }
  }
}
