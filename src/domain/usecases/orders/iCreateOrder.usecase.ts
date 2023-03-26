import { iUsecase } from "src/domain/contracts";
import { OrderEntity } from "src/domain/entities";


export abstract class iCreateOrderUsecase implements iUsecase {
    abstract exec(input: iCreateOrderUsecase.Input, options ?: iUsecase.Options): Promise<any>;
}

export namespace iCreateOrderUsecase {
    export abstract class Input implements Partial<OrderEntity> {
        public company_id: string;
        public itens?: Array<OrderEntity.ItemOrder>;
    }

    export type Output = {
        id : string
    }
}