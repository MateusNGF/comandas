import { iController } from "../../../../../src/application/contracts";
import { CreationEventController } from "../../../../../src/application/controllers/event/creation";
import { makeUsecaseCreationEvent } from "../usecases/event.factory";

export const makeCreationEventController = () : iController => {
  const usecaseCreationEvent = makeUsecaseCreationEvent()
  return new CreationEventController(
    usecaseCreationEvent
  )
}