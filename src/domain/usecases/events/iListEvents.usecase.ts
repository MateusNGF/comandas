import { iUsecase } from '../../contracts';
import { EventEntity } from '../../entities';
import { BaseFilterForEntities } from '../../types';

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

  export type Filters = BaseFilterForEntities & BaseFilterEntityEventEntity;

  abstract class BaseFilterEntityEventEntity implements Partial<EventEntity> {
    public start_date?: Date;
    public end_date?: Date;
  }
}
