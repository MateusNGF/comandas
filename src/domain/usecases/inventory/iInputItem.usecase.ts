import { iUsecase } from 'src/domain/contracts';
import { ItemEntity } from 'src/domain/entities/itens/item.entity';
import { ProductEntity } from 'src/domain/entities/itens/product.entity';

export abstract class iInputItemUsecase implements iUsecase {
  abstract exec<Item extends ItemEntity = ProductEntity>(
    input: iInputItemUsecase.Input<Item>,
    options?: iUsecase.Options
  ): Promise<iInputItemUsecase.Output<Item>>;
}

export namespace iInputItemUsecase {
  export type Input<Item extends ItemEntity = ItemEntity> = Item;
  export type Output<Item extends ItemEntity = ItemEntity> = Item;
}
