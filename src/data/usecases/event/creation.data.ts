import {
  MissingParamError,
  UnauthorizedError,
} from '../../../../src/domain/errors';
import { iCreationEvent } from '@/src/domain/usecases/events';
import {
  iCompanyRepository,
  iEventRepository,
} from '@/src/infra/database/contracts/repositorys';
import { Event } from '../../../../src/domain/entities';
import { ObjectManager } from '../../../../src/domain/utils';

export class CreationEventData implements iCreationEvent {
  constructor(
    private readonly companyRepository: iCompanyRepository,
    private readonly eventRepository: iEventRepository
  ) {}
  async exec(input: iCreationEvent.input): Promise<iCreationEvent.output> {
    if (!input.company_id) throw new UnauthorizedError('Token required.');
    if (!input.event) throw new MissingParamError('Missing event.');

    if (!(await this.companyRepository.findById(input.company_id)))
      throw new UnauthorizedError('Company not found.');

    ObjectManager.hasKeys(['name', 'startData', 'endData'], input.event, false);

    const event = new Event({
      company_id: input.company_id,
      ...input.event,
    });

    const createdEvent = await this.eventRepository.register(event);

    if (createdEvent) {
      return {
        _id: input.company_id,
        createdAt: input.event.createAt,
      };
    }
  }
}
