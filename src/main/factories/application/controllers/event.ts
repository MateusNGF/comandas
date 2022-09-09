
import { ArchivationEventController, CreationEventController } from '../../../../../src/application/controllers/event';
import { iController } from '../../../../../src/application/contracts';
import { makeUsecaseArchivationEvent, makeUsecaseCreationEvent } from '../usecases/event.factory';

export const makeCreationEventController = (): iController => {
  const usecaseCreationEvent = makeUsecaseCreationEvent();
  return new CreationEventController(usecaseCreationEvent);
};

export const makeArchivationEventController = (): iController => {
  const usecaseArchivationEvent = makeUsecaseArchivationEvent();
  return new ArchivationEventController(usecaseArchivationEvent);
};
