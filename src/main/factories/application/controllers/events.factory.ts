
import { ArchivateEventController, CreateEventController } from '../../../../application/controllers/events';
import { iController } from '../../../../application/contracts';
import { makeUsecaseArchivationEvent, makeUsecaseCreationEvent } from '../usecases/events.factory';

export const makeCreationEventController = (): iController => {
  const usecaseCreationEvent = makeUsecaseCreationEvent();
  return new CreateEventController(usecaseCreationEvent);
};

export const makeArchivationEventController = (): iController => {
  const usecaseArchivationEvent = makeUsecaseArchivationEvent();
  return new ArchivateEventController(usecaseArchivationEvent);
};
