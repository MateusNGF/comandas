import { Collection } from 'mongodb';
import { iDatabase } from './iDatabase';

export interface iMongoDB extends iDatabase {
  connect(): Promise<void>;
  close(): Promise<void>;
  colletion<Schema>(name: string): Collection<Schema>;
}
