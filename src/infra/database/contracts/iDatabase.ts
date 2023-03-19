export abstract class iDatabase {
  abstract connect(): Promise<void>;
  abstract close(): Promise<void>;
}


export interface iSession extends iTransaction {
  startSession() : iSession;
  endSession() : Promise<void>;
  get() : any;
}


export interface iTransaction {
  initTransaction() : Promise<iTransaction>;
  commitTransaction() : Promise<void>;
  rollbackTransaction() : Promise<void>;
}
