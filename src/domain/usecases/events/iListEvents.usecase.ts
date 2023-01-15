import { iUsecase } from '../../contracts';
import { Event } from '../../entities';

export abstract class iListEvents implements iUsecase {
  abstract exec(input: iListEvents.input): Promise<iListEvents.output>;
}

export namespace iListEvents {
  export type input = {
    companyId: string;
    filters?: iListEvents.filters;
  };
  export type output = Array<Event>;

  export type filters = {
    startDate?: string | Date;
    endDate?: string | Date;
    eventId?: string;
    text?: string;
  };
}
