import { iController } from '../../../application/contracts';
import { HttpRequest, HttpResponse } from '../../../application/helpers/http';
import {
  ItemEntity,
  ProductEntity,
  ServiceEntity,
} from '../../../domain/entities';
import { BadRequestError } from '../../../domain/errors';
import { iInputProductUsecase } from '../../../domain/usecases/inventory';
import { ObjectManager } from '../../../utils';

export class RegisterItemController extends iController {
  constructor(private readonly inputProductUsecase: iInputProductUsecase) {
    super();
  }

  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const itens: Array<ItemEntity> = request.body;
      const { companyId } = request.headers.decodedTokenCompany;

      if (!itens.length) throw new BadRequestError('Need one item');

      const products: Array<ProductEntity> = [];
      const serivces: Array<ServiceEntity> = [];

      itens.forEach((item, index) => {
        try {
          ObjectManager.hasKeys<ItemEntity>(
            ['name', 'type', 'sale_price'],
            item
          );

          if (item.type == 'product') {
            ObjectManager.hasKeys<ProductEntity>(['quantity'], item);
            products.push(item);
          }

          if (item.type == 'service') {
            serivces.push(item);
          }
        } catch (error) {
          error.message = `Item ${index}: ${error.message}`;
          throw error;
        }
      });

      const resultInsertProducts = await this.inputProductUsecase.exec({
        company_id: companyId,
        items: products as Array<iInputProductUsecase.ProductIncomig>,
      });

      const apresentation = {
        result: {
          products: resultInsertProducts.map((item, index) => ({
            ...item,
            name: products[index].name,
          })),
        },
      };

      return this.sendSucess(200, apresentation);
    } catch (e) {
      return this.sendError(e);
    }
  }
}
