import { iUsecase } from '../../contracts';
import { Event } from '../../entities/event.entity';

export abstract class iCreateEvent implements iUsecase {
  abstract exec(input: iCreateEvent.input): Promise<iCreateEvent.output>;
}

export namespace iCreateEvent {
  export type input = {
    companyId: string;
    event: Event;
  };
  export type output = {
    _id: string;
    createdAt: string;
  };
}
