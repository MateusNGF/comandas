import { BadRequestError } from '../../../../src/domain/errors';
import { iCreationEvent } from '../../../../src/domain/usecases/events';
import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from '../../helpers/http';

export class CreationEventController extends iController {
  constructor(private readonly usecase: iCreationEvent) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const newEvent = await this.usecase.exec({
        companyId: request.headers?._id,
        event: request.body,
      });
      if (!newEvent)
        throw new BadRequestError(
          `it was not possible to create the event, try later.`
        );

      return this.sendSucess(200, newEvent);
    } catch (e) {
      return this.sendError(e);
    }
  }
}
