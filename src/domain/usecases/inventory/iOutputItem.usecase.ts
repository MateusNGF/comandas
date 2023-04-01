import { iUsecase } from "src/domain/contracts";
import { ItemEntity } from "src/domain/entities";


export abstract class iOutputItemUsecase implements iUsecase {
    abstract exec(
        input: Array<iOutputItemUsecase.Input>,
        options?: Array<iUsecase.Options>
    ): Promise<iOutputItemUsecase.Output>;
}


export namespace iOutputItemUsecase {
    export abstract class Input implements Partial<ItemEntity> {
        public id: any;
        public quantity: number;
    }
    export type Output = boolean
}