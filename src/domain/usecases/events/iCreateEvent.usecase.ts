import { iUsecase } from '../../contracts';
import { EventEntity } from '../../entities/event.entity';

export abstract class iCreateEvent implements iUsecase {
  abstract exec(input: iCreateEvent.input): Promise<iCreateEvent.output>;
}

export namespace iCreateEvent {
  export type input = {
    companyId: string;
    event: EventEntity;
  };
  export type output = {
    _id: string;
    created_at: Date;
  };
}
