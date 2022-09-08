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
    if (!input.companyId) throw new UnauthorizedError('CompanyId required.');
    if (!input.event) throw new MissingParamError('Missing event.');
    
    ObjectManager.hasKeys(['name', 'startData', 'endData'], input.event);
    
    if (!(await this.companyRepository.findById(input.companyId)))
      throw new UnauthorizedError('Company not found.');


    const event = new Event({
      company_id: input.companyId,
      ...input.event,
    });

    const createdEvent = await this.eventRepository.register(event);

    if (createdEvent) {
      return {
        _id: input.companyId,
        createdAt: input.event.createAt,
      };
    }
  }
}
