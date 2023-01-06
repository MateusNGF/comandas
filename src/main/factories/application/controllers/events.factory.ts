
import { ArchivateEventController, CreateEventController, GetEventController, ListEventsController } from '../../../../application/controllers/events';
import { iController } from '../../../../application/contracts';
import { makeUsecaseArchivationEvent, makeUsecaseCreationEvent, makeUsecaseListEventsEvent } from '../usecases/events.factory';

export const makeCreationEventController = (): iController => {
  const usecaseCreationEvent = makeUsecaseCreationEvent();
  return new CreateEventController(usecaseCreationEvent);
};

export const makeArchivationEventController = (): iController => {
  const usecaseArchivationEvent = makeUsecaseArchivationEvent();
  return new ArchivateEventController(usecaseArchivationEvent);
};

export const makeGetEventController = (): iController => {
  const usecaseListEvents = makeUsecaseListEventsEvent();
  return new GetEventController(usecaseListEvents);
};

export const makeListEventsController = (): iController => {
  const usecaseListEvents = makeUsecaseListEventsEvent();
  return new ListEventsController(usecaseListEvents);
};