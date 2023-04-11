import { iUsecase } from 'src/domain/contracts';
import { ItemEntity, ProductEntity } from 'src/domain/entities';
import { BaseFilterForEntities } from 'src/utils/types';

export abstract class iListInventoryUsecase implements iUsecase {
  abstract exec(
    input: iListInventoryUsecase.Input,
    options?: iUsecase.Options
  ): Promise<iListInventoryUsecase.Output>;
}

export namespace iListInventoryUsecase {
  export type Input = {
    company_id: string;
    filters?: iListInventoryUsecase.FiltersList;
  };
  export type Output = Array<ItemEntity>;

  export type FiltersList = BaseFilterForEntities &
    Partial<BaseFilterForEntityItem> &
    Partial<BaseFilterForProductEntiry & BaseFilterForServiceEntity>;

  abstract class BaseFilterForEntityItem implements Partial<ItemEntity> {
    public type?: ItemEntity.TypeItens;
    public sale_price?: number;
  }

  abstract class BaseFilterForProductEntiry implements Partial<ProductEntity> {
    public buy_price?: number;
  }

  abstract class BaseFilterForServiceEntity implements Partial<ProductEntity> {}
}
