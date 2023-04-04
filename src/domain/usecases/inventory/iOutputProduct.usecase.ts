import { iUsecase } from "src/domain/contracts";
import { ProductEntity } from "src/domain/entities";


export abstract class iOutputProductUsecase implements iUsecase {
    abstract exec(
        input: iOutputProductUsecase.Input,
        options?: iUsecase.Options
    ): Promise<iOutputProductUsecase.Output>;
}


export namespace iOutputProductUsecase {
    export abstract class Input {
        company_id: string;
        items: Array<ProductReference>;
    }

    export abstract class ProductReference implements Partial<ProductEntity> {
        public id: any;
        public quantity: number;
    }
    export type Output = Boolean;
}