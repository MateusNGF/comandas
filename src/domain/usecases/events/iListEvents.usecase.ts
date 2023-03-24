import { iUsecase } from '../../contracts';
import { EventEntity } from '../../entities';
import { BaseFilterForListing } from '../../types';

export abstract class iListEventsUsecase implements iUsecase {
  abstract exec(
    input: iListEventsUsecase.Input,
    options?: iUsecase.Options
  ): Promise<iListEventsUsecase.Output>;
}

export namespace iListEventsUsecase {
  export type Input = {
    companyId: string;
    filters?: iListEventsUsecase.Filters;
  };
  export type Output = Array<EventEntity>;

  export type Filters = BaseFilterForListing & {
    startDate?: string | Date;
    endDate?: string | Date;
    eventId?: string;
  };
}
