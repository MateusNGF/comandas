import { Event } from '@/src/domain/entities';
import { Collection, ObjectId } from 'mongodb';
import { iEventRepository } from '../../contracts/repositorys/iEventRepository';

export class EventRepository implements iEventRepository {
  constructor(private readonly Colletion: Collection<Event>) {}
  findById(_id: string): Promise<Event> {
    return this.Colletion.findOne(new ObjectId(_id));
  }

  async register(event: Event): Promise<{ _id: string }> {
    const response = await this.Colletion.insertOne(event);
    if (response.insertedId) {
      return { _id: response.insertedId };
    }
  }

  async archive(event_id: string): Promise<boolean> {
    const response = await this.Colletion.updateOne(
      { _id: event_id },
      { $set : {archived: true}}
    );

    if (response.modifiedCount > 0) return true;
  }
}
