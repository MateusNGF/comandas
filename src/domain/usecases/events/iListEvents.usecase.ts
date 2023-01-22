import { iUsecase } from '../../contracts';
import { Event } from '../../entities';
import { BaseFilterForListing } from '../../types';

export abstract class iListEvents implements iUsecase {
  abstract exec(input: iListEvents.Input): Promise<iListEvents.Output>;
}

export namespace iListEvents {
  export type Input = {
    companyId: string;
    filters?: iListEvents.Filters;
  };
  export type Output = Array<Event>;

  export type Filters = BaseFilterForListing & {
    startDate?: string | Date;
    endDate?: string | Date;
    eventId?: string;
  };
}
