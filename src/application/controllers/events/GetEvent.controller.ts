import { BadRequestError } from '../../../../src/domain/errors';
import { HTTP_STATUS } from '../../../../src/domain/types/Http.status';
import { iListEventsUsecase } from '../../../../src/domain/usecases/events';
import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from '../../helpers/http';

export class GetEventController extends iController {
  constructor(private readonly listEventsUsecase: iListEventsUsecase) {
    super();
  }

  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { companyId } = request.headers.decodedTokenCompany;
      const eventId = request.params.eventId;

      const filters: iListEventsUsecase.Filters = { id: eventId };

      const events = await this.listEventsUsecase.exec({ companyId, filters });
      if (!events.length)
        throw new BadRequestError(`Event with id ${eventId} not found.`);

      return this.sendSucess(HTTP_STATUS.OK, { event: events[0] });
    } catch (e) {
      return this.sendError(e);
    }
  }
}
