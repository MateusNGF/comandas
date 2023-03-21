import { BadRequestError } from '../../../domain/errors';
import { EventEntity } from '../../../../src/domain/entities';
import { ObjectManager } from '../../../../src/domain/utils';
import { iCreateEvent } from '../../../domain/usecases/events';
import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from '../../helpers/http';

export class CreateEventController extends iController {
  constructor(private readonly createEventUsecase: iCreateEvent) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { companyId } = request.headers.decodedTokenCompany;
      const event = request.body;

      ObjectManager.hasKeys<EventEntity>(
        ['name', 'description', 'start_date', 'end_date'],
        event
      );

      const result = await this.createEventUsecase.exec({
        companyId: companyId,
        event: event,
      });

      if (!result) throw new BadRequestError('The event could not be registered')

      return this.sendSucess(200, result);
    } catch (e) {
      return this.sendError(e);
    }
  }
}
