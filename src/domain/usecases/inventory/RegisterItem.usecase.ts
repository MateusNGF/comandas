import { iUsecase } from "src/domain/contracts";
import { ItemEntity } from "src/domain/entities/itens/item.entity";
import { ProductEntity } from "src/domain/entities/itens/product.entity";

export abstract class iRegisterItemUsecase implements iUsecase {
    abstract exec<Item extends ItemEntity = ProductEntity>(input: iRegisterItemUsecase.Input<Item>, options ?: iUsecase.Options): Promise<iRegisterItemUsecase.Output<Item>>;
}


export namespace iRegisterItemUsecase {
    export type Input<Item extends ItemEntity = ItemEntity> = Item
    export type Output<Item extends ItemEntity = ItemEntity> = Item
}