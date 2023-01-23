import {
  CreateEventData,
  ListEvents,
} from '../../../../../src/data/usecases/events';
import { ArchivateEventData } from '../../../../data/usecases/events/ArchivateEvent.data';
import {
  iArchivateEvent,
  iCreateEvent,
  iListEvents,
} from '../../../../../src/domain/usecases/events';
import { makeCompanyRepository, makeEventRepository } from '../../infra/database';



export const makeUsecaseCreateEvent = (): iCreateEvent => {
  return new CreateEventData(makeCompanyRepository(), makeEventRepository());
};

export const makeUsecaseArchivateEvent = (): iArchivateEvent => {
  return new ArchivateEventData(makeEventRepository());
};

export const makeUsecaseListEventsEvent = (): iListEvents => {
  return new ListEvents(makeEventRepository());
};
