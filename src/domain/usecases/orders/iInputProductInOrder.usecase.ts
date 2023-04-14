import { ProductOutputRecord, ProductOutputReference } from "src/domain/entities";


export abstract class iInputProductInOrderUsecase {
    abstract exec(input: iInputProductInOrderUsecase.Input): Promise<iInputProductInOrderUsecase.Ouput>;
}


export namespace iInputProductInOrderUsecase {
    export interface Input {
        company_id: string;
        order_id?: string;
        itens: Array<ProductOutputReference>;
    }
    export type Ouput = Array<ProductOutputRecord> 
}