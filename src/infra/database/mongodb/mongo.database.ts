import { Collection, MongoClient } from 'mongodb';
import { iDatabase } from '../contracts';
import { MongoSession } from './mongo.session';

class Mongo implements iDatabase {
  private client: MongoClient | null = null;

  public async connect(): Promise<void> {
    if (!this.client) {
      this.client = await MongoClient.connect(process.env.MONGO_URI as string);
    }
  }

  public async close(): Promise<void> {
    if (this.client) await this.client.close();
    this.client = null;
  }

  public makeSession() : iDatabase.iSession {
    return new MongoSession(this.client)
  }

  public colletion<Schema>(name: string): Collection<Schema> {
    if (!this.client) throw new Error('No has connection with database.');
    return this.client
      .db(process.env.MONGO_DATABASE as string)
      .collection<Schema>(name);
  }
}

export const MongoDB = new Mongo();
