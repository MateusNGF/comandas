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
import {
  makeCompanyRepository,
  makeEventRepository,
  makeSessionInMongo,
} from '../../infra/database/mongo.factory';

export const makeUsecaseCreateEvent = (): iCreateEvent => {
  return new CreateEventData(
    makeSessionInMongo(),
    makeCompanyRepository(), 
    makeEventRepository()
  );
};

export const makeUsecaseArchivateEvent = (): iArchivateEvent => {
  return new ArchivateEventData(makeEventRepository());
};

export const makeUsecaseListEventsEvent = (): iListEvents => {
  return new ListEvents(makeEventRepository());
};
