import { iUsecase } from 'src/domain/contracts';
import {  InternalError } from '../../../../src/domain/errors';
import { iListEvents } from '../../../../src/domain/usecases/events';
import { iEventRepository } from '../../../../src/infra/database/contracts/repositorys';

export class ListEvents implements iListEvents {
  constructor(private readonly eventRepository: iEventRepository) {}
  async exec(
    input: iListEvents.Input,
    options : iUsecase.Options
  ): Promise<iListEvents.Output> {
    const { companyId, filters } = input;
    if (!companyId) throw new InternalError('CompanyId no sent.');

    const events = await this.eventRepository.list(companyId, filters, options);

    return events;
  }
}
