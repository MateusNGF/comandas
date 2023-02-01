import { iUsecase } from '../../../contracts';
import { Product } from '../../../entities/itens/product.entity';

export abstract class iInsertProducts implements iUsecase {
  abstract exec(input: iInsertProducts.input): Promise<iInsertProducts.output>;
}

export namespace iInsertProducts {
  export type input = {
    companyId: string;
    products: Array<Product>;
  };

  export type output = Array<Product>;
}
