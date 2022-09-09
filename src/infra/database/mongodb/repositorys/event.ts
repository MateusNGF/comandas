import { Event } from '@/src/domain/entities';
import { Collection, ObjectId } from 'mongodb';
import { iEventRepository } from '../../contracts/repositorys/iEventRepository';

export class EventRepository implements iEventRepository {
  constructor(private readonly Colletion: Collection<Event>) {}
  findById(_id: string): Promise<Event> {
    return this.Colletion.findOne(new ObjectId(_id));
  }

  async register(event: Event): Promise<{ _id: any }> {
    const response = await this.Colletion.insertOne(event);
    if (response.insertedId) {
      return { _id: response.insertedId };
    }
  }

  async archive(eventId:string, company_id:string): Promise<boolean> {
    const response = await this.Colletion.updateOne(
      { _id : new ObjectId(eventId), company_id },
      { $set : {"archived": true}}
    );
    if (response.matchedCount){
      return !!response.modifiedCount
    }
  }

  async unarchive(eventId: string, company_id: string): Promise<boolean> {
    const response = await this.Colletion.updateOne(
      { _id : new ObjectId(eventId), company_id },
      { $set : {"archived": false}}
    );
    if (response.matchedCount){
      return !!response.modifiedCount
    }
  }
}
