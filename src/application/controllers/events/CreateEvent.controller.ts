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

      const { _id } = await this.createEventUsecase.exec({
        companyId: companyId,
        event: event,
      });

      return this.sendSucess(200, { _id });
    } catch (e) {
      return this.sendError(e);
    }
  }
}
