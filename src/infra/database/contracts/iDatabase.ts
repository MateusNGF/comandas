export abstract class iDatabase {
  abstract connect(): Promise<void>;
  abstract close(): Promise<void>;
}
