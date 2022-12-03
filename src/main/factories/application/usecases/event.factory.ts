import { CreationEventData } from '../../../../data/usecases/event';
import { Event } from '../../../../../src/domain/entities';
import { iArchivationEvent, iCreationEvent } from '../../../../../src/domain/usecases/events';
import { MongoDB } from '../../../../infra/database/mongodb';
import { makeCompanyRepository } from './company.factory';
import { ArchivationEventData } from '../../../../../src/data/usecases/event/archivation.data';
import { EventRepository } from '../../../../../src/infra/database/mongodb/repositorys/event.repository';

export function makeEventRepository() {
  const collection = MongoDB.colletion<Event>('events');
  const repository = new EventRepository(collection);
  return repository;
}

export const makeUsecaseCreationEvent = (): iCreationEvent => {
  return new CreationEventData(makeCompanyRepository(), makeEventRepository());
};

export const makeUsecaseArchivationEvent = (): iArchivationEvent => {
  return new ArchivationEventData(makeEventRepository());
};
