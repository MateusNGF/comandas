import { append } from '../../../utils';
import { iController } from '../../../application/contracts';
import { HttpRequest, HttpResponse } from '../../../application/helpers/http';
import { HTTP_STATUS } from '../../../utils/types/Http.status';
import { iListOrderUsecase } from '../../../domain/usecases/orders';

export class ListOrderController extends iController {
  constructor(private readonly listOrderUsecase: iListOrderUsecase) {
    super();
  }

  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const company_id = request.headers.decodedTokenCompany.companyId;
      let filters: iListOrderUsecase.Filters = request.body;

      const order_id = request.params?.order_id;
      if (order_id) {
        filters = append<iListOrderUsecase.Filters>(filters, { id: order_id });
      }

      const orders = await this.listOrderUsecase.exec({ company_id, filters });
      return this.sendSucess(HTTP_STATUS.OK, { orders });
    } catch (e) {
      return this.sendError(e);
    }
  }
}
