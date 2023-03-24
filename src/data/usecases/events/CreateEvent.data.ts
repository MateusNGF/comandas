import { BadRequestError } from '../../../../src/domain/errors';
import { iCreateEventUsecase } from '../../../../src/domain/usecases/events';

import {
  iCompanyRepository,
  iEventRepository,
} from '../../../../src/infra/database/contracts/repositorys';
import { EventEntity } from '../../../domain/entities';
import { DateProvider } from '../../../../src/infra/date/DateProvider.date';
import { iUsecase } from 'src/domain/contracts';
import { iDatabase } from 'src/infra/database/contracts';

export class CreateEventData implements iCreateEventUsecase {
  constructor(
    private readonly sessionDatabase: iDatabase.iSession,
    private readonly companyRepository: iCompanyRepository,
    private readonly eventRepository: iEventRepository
  ) {}
  async exec(input: iCreateEventUsecase.Input): Promise<iCreateEventUsecase.Output> {
    const session = this.sessionDatabase.startSession();

    try {
      session.initTransaction();

      const event = input;

      if (DateProvider(event.start_date).isAfter(event.end_date)) {
        throw new BadRequestError(
          'The start date cannot be equal to or after the end date of the event.'
        );
      }

      const company = await this.companyRepository.findById(event.company_id, {session});
      if (!company) throw new BadRequestError('Company not found.');

      const newEvent = new EventEntity({
        id: this.eventRepository.generateId(),
        company_id: event.company_id,
        name: event.name,
        start_date: new Date(event.start_date),
        end_date: new Date(event.end_date),
        description: event?.description,
      });

      const creatededEvent = await this.eventRepository.register(newEvent, {session});
      if (!creatededEvent?.id) throw new BadRequestError('Failed create event, try latey.')

      await session.commitTransaction();
      return newEvent
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
