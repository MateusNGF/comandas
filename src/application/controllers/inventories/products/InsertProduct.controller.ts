import { Product } from '../../../../domain/entities/itens/product.entity';
import { BadRequestError } from '../../../../domain/errors';
import { iInsertProducts } from '../../../../domain/usecases/inventories/products/iInsertProducts.usecase';
import { ObjectManager } from '../../../../domain/utils';
import { iController } from '../../../contracts';
import { HttpRequest, HttpResponse } from '../../../helpers/http';

export class InsertProductsController extends iController {
  constructor(private readonly insertProductUsecase: iInsertProducts) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { companyId } = request.headers.decodedTokenCompany;

      if (!request.body) throw new BadRequestError('Body is required.');
      if (!request.body.products) throw new BadRequestError('Products is required.');

      const products: Array<Product> = request.body.products;
      if (!products.length) throw new BadRequestError('Nothing products sent.');

      products.forEach((product) => {
        ObjectManager.hasKeys<Product>(
          ['name', 'sale_price', 'quantity'],
          product
        );
      });

      const productsInserted = await this.insertProductUsecase.exec({
        companyId: companyId,
        products,
      });

      return this.sendSucess(200, { productsInserted });
    } catch (e) {
      return this.sendError(e);
    }
  }
}
