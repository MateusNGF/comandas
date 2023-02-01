import { iUsecase } from "../../../../../src/domain/contracts";
import { Product } from "../../../entities/itens/product.entity";
import { BaseFilterForListing } from "../../../../../src/domain/types";


export abstract class iListProducts implements iUsecase {
  abstract exec(input: iListProducts.Input): Promise<iListProducts.Output>;
}

export namespace iListProducts {
    export type Input = {
        companyId: string;
        filters?: iListProducts.Filters;
    };
    export type Output = Array<Product>;

    export type Filters = BaseFilterForListing & { productId?: string; };
}
