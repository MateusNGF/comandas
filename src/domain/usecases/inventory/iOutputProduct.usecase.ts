import { iUsecase } from "src/domain/contracts";
import { ProductOutputRecord, ProductOutputReference } from "src/domain/entities";


export abstract class iOutputProductUsecase implements iUsecase {
    abstract exec(
        input: iOutputProductUsecase.Input,
        options?: iUsecase.Options
    ): Promise<iOutputProductUsecase.Output>;
}


export namespace iOutputProductUsecase {
    export abstract class Input {
        company_id: string;
        items: Array<ProductOutputReference>;
    }
    
    export type Output = Array<ProductOutputRecord>;
}