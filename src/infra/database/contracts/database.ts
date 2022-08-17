export abstract class Database {
  abstract connect(): Promise<void>;
  abstract close(): Promise<void>;
}
