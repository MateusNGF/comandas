import { BadRequestError } from '../../../domain/errors';
import { iArchivationEvent } from '../../../domain/usecases/events';
import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from '../../helpers/http';

export class ArchivationEventController extends iController {
  constructor(private readonly usecase: iArchivationEvent) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { action, eventId } = request.params
      const newEvent = await this.usecase.exec({
        companyId: request.headers?._id,
        eventId : eventId,
        action : action
      });

      if (!newEvent)
        throw new BadRequestError(
          `it was not possible to ${action} the event.`
        );

      return this.sendSucess(200, newEvent);
    } catch (e) {
      return this.sendError(e);
    }
  }
}
