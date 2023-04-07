import { iUsecase } from '../../../domain/contracts';
import { ProductEntity } from '../../../domain/entities/itens/product.entity';

export abstract class iInputProductUsecase implements iUsecase {
  abstract exec(
    input: iInputProductUsecase.Input,
    options?: iUsecase.Options
  ): Promise<iInputProductUsecase.Output>;
}

export namespace iInputProductUsecase {
  export type Input = {
    company_id: string;
    items: Array<ProductIncomig>;
  };

  export abstract class ProductIncomig implements Partial<ProductEntity> {
    public name: string;
    public description?: string;
    public sale_price: number;
    public buy_price?: number;
    public quantity: number;
  }

  export type ResultOperation = {
    isError: boolean;
    message: string;
  };
  export type Output = Array<ResultOperation>;
}
