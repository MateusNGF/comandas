import {
  CreateEventData,
  ListEventsData,
} from '../../../../../src/data/usecases/events';
import { ArchivateEventData } from '../../../../data/usecases/events/ArchivateEvent.data';
import {
  iArchivateEvent,
  iCreateEventUsecase,
  iListEventsUsecase,
} from '../../../../../src/domain/usecases/events';
import {
  makeCompanyRepository,
  makeEventRepository,
  makeSessionInMongo,
} from '../../infra/database/mongo.factory';

export const makeUsecaseCreateEvent = (): iCreateEventUsecase => {
  return new CreateEventData(
    makeSessionInMongo(),
    makeCompanyRepository(),
    makeEventRepository()
  );
};

export const makeUsecaseArchivateEvent = (): iArchivateEvent => {
  return new ArchivateEventData(makeEventRepository());
};

export const makeUsecaseListEventsEvent = (): iListEventsUsecase => {
  return new ListEventsData(makeEventRepository());
};
