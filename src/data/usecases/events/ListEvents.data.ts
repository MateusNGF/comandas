import { iUsecase } from 'src/domain/contracts';
import { BadRequestError } from '../../../../src/domain/errors';
import { iListEventsUsecase } from '../../../../src/domain/usecases/events';
import { iEventRepository } from '../../../../src/infra/database/contracts/repositorys';

export class ListEventsData implements iListEventsUsecase {
  constructor(private readonly eventRepository: iEventRepository) {}
  async exec(
    input: iListEventsUsecase.Input,
    options: iUsecase.Options
  ): Promise<iListEventsUsecase.Output> {
    const { companyId, filters } = input;

    if (!companyId) throw new BadRequestError('Missing company id');

    const events = await this.eventRepository.list(companyId, filters, options);

    return events;
  }
}
