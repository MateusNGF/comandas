import { iUsecase } from '../../contracts';
import { Event } from '../../entities/event.entity';

export abstract class iCreationEvent implements iUsecase {
  abstract exec(input: iCreationEvent.input): Promise<iCreationEvent.output>;
}

export namespace iCreationEvent {
  export type input = {
    company_id: string;
    event: Event;
  };
  export type output = {
    _id: string;
    createdAt: string;
  };
}
