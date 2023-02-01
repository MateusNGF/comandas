import { Event } from '../../../../../src/domain/entities';
import { Collection, ObjectId, Filter } from 'mongodb';
import { iEventRepository } from '../../contracts/repositorys/iEventRepository';
import { iListEvents } from '../../../../../src/domain/usecases/events';
import { DateProvider } from '../../../../../src/infra/date/DateProvider.date';

export class EventsRepository implements iEventRepository {
  constructor(private readonly Colletion: Collection<Event>) {}
  findById(_id: string): Promise<Event> {
    return this.Colletion.findOne({ id: _id });
  }

  async register(event: Event): Promise<{ _id: any }> {
    const eventWithId = new Event({
      ...event,
      id: new ObjectId().toHexString(),
    });

    const response = await this.Colletion.insertOne(eventWithId);
    if (response.insertedId) {
      return { _id: response.insertedId };
    }
  }

  async archive(eventId: string, company_id: string): Promise<boolean> {
    const response = await this.Colletion.updateOne(
      { id: new ObjectId(eventId), company_id },
      { $set: { archived_date: new Date() } }
    );
    if (response.matchedCount) {
      return !!response.modifiedCount;
    }
  }

  async unarchive(eventId: string, company_id: string): Promise<boolean> {
    const response = await this.Colletion.updateOne(
      { id: new ObjectId(eventId), company_id },
      { $set: { archived_date: null } }
    );
    if (response.matchedCount) {
      return !!response.modifiedCount;
    }
  }

  list(companyId: string, filters?: iListEvents.Filters): Promise<Event[]> {
    let where: Filter<Event> = {
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

    return this.Colletion.find(where).toArray();
  }
}
