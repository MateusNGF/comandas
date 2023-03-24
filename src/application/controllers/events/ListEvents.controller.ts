import { HTTP_STATUS } from '../../../../src/domain/types/Http.status';
import { iListEventsUsecase } from '../../../../src/domain/usecases/events';
import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from '../../helpers/http';

export class ListEventsController extends iController {
  constructor(private readonly listEventsUsecase: iListEventsUsecase) {
    super();
  }

  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { companyId } = request.headers.decodedTokenCompany;
      const filters: iListEventsUsecase.Filters = request.body as any;

      const events = await this.listEventsUsecase.exec({ companyId, filters });

      return this.sendSucess(HTTP_STATUS.OK, { events });
    } catch (e) {
      return this.sendError(e);
    }
  }
}
