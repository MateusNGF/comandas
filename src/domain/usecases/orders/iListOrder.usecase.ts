import { iUsecase } from '../../..//domain/contracts';
import { OrderEntity } from '../../..//domain/entities';
import { BaseFilterForEntities } from '../../..//domain/types';

export abstract class iListOrderUsecase implements iUsecase {
  abstract exec(
    input: iListOrderUsecase.Input,
    options?: iUsecase.Options
  ): Promise<iListOrderUsecase.Ouput>;
}

export namespace iListOrderUsecase {
  export type Input = {
    company_id: string;
    filters: iListOrderUsecase.Filters;
  };
  export type Ouput = Array<OrderEntity>;
  export interface Filters extends BaseFilterForEntities {}
}
