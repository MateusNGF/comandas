import { Collection, MongoClient } from "mongodb";
import { Database } from "./contracts";

class MongoDriver extends Database {

  private client : MongoClient | null = null;

  public async connect() : Promise<void> {
    if (!this.client){
      this.client = await MongoClient.connect(process.env.MONGO_URI as string)
    }
  }

  public async close() : Promise<void> {
    if (this.client) await this.client.close()
    this.client = null
  }

  public colletion<Schema>(name : string) : Collection<Schema> {
    if (!this.client) throw new Error("no has connection with database.")
    return this.client.db(process.env.MONGO_DATABASE as string).collection<Schema>(name)
  }
}

export const MongoDB = new MongoDriver()