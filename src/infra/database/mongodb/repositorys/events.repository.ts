import { EventEntity } from '../../../../../src/domain/entities';
import { Collection, ObjectId, Filter } from 'mongodb';
import { iEventRepository } from '../../contracts/repositorys/iEventRepository';
import { iListEvents } from '../../../../../src/domain/usecases/events';
import { DateProvider } from '../../../../../src/infra/date/DateProvider.date';
import { iBaseRepository } from '../../contracts/repositorys';

export class EventsRepository implements iEventRepository {
  constructor(private readonly Colletion: Collection<EventEntity>) {}
  findById(
    _id: string,
    options?: iBaseRepository.Options
  ): Promise<EventEntity> {
    return this.Colletion.findOne(
      { id: _id },
      { session: options?.session?.get() }
    );
  }

  async register(
    event: EventEntity,
    options?: iBaseRepository.Options
  ): Promise<{ id: any }> {
    const eventWithId = new EventEntity({
      ...event,
      id: new ObjectId().toHexString(),
    });

    const response = await this.Colletion.insertOne(eventWithId, {
      session: options?.session?.get(),
    });

    if (response.insertedId) {
      return { id: eventWithId.id };
    }
  }

  async archive(
    event_id: string,
    company_id: string,
    options?: iBaseRepository.Options
  ): Promise<boolean> {
    const response = await this.Colletion.updateOne(
      { id: event_id, company_id },
      { $set: { archived_date: new Date() } },
      { session: options?.session?.get() }
    );
    if (response.matchedCount) {
      return !!response.modifiedCount;
    }
  }

  async unarchive(
    event_id: string,
    company_id: string,
    options?: iBaseRepository.Options
  ): Promise<boolean> {
    const response = await this.Colletion.updateOne(
      { id: event_id, company_id },
      { $set: { archived_date: null } },
      { session: options?.session?.get() }
    );
    if (response.matchedCount) {
      return !!response.modifiedCount;
    }
  }

  list(
    companyId: string,
    filters?: iListEvents.Filters,
    options?: iBaseRepository.Options
  ): Promise<EventEntity[]> {
    let where: Filter<EventEntity> = {
      company_id: companyId,
    };

    if (filters) {
      if (filters.eventId) {
        where = {
          id: filters.eventId as any,
          ...where,
        };
      }

      if (filters.startDate && filters.endDate) {
        where = {
          ...where,
          start_date: {
            $gte: DateProvider(filters.startDate).toPrimitive(),
          },
          end_date: {
            $lte: DateProvider(filters.endDate).toPrimitive(),
          },
        };
      }

      if (filters.text) {
        where = {
          ...where,
          $text: { $search: filters.text },
        };
      }
    }
    return this.Colletion.find(where, {
      session: options?.session?.get(),
    }).toArray();
  }
}
