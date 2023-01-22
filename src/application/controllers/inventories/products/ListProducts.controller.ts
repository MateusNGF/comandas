import { iController } from "../../../../../src/application/contracts";
import { HttpRequest, HttpResponse } from "../../../../../src/application/helpers/http";
import { HTTP_STATUS } from "../../../../../src/domain/types/Http.status";
import { iListProducts } from "../../../../../src/domain/usecases/inventories/products/iListProducts.usecase";




export class ListProductsController extends iController {
  constructor(private readonly listProductsUsecase: iListProducts) {
    super();
  }

  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { companyId } = request.headers.decodedTokenCompany;
      const filters: iListProducts.Filters = request.body as any;

      const products = await this.listProductsUsecase.exec({ companyId, filters });

      return this.sendSucess(HTTP_STATUS.OK, { products });
    } catch (e) {
      return this.sendError(e);
    }
  }
}
