import { iController } from '../../../../../src/application/contracts';
import { CreationEventController } from '../../../../application/controllers/event/creation.controller';
import { makeUsecaseCreationEvent } from '../usecases/event.factory';

export const makeCreationEventController = (): iController => {
  const usecaseCreationEvent = makeUsecaseCreationEvent();
  return new CreationEventController(usecaseCreationEvent);
};
