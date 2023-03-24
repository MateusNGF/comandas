import { iDatabase } from '../iDatabase';

export abstract class iBaseRepository<T = any> {
  abstract findById(id: string, options?: iBaseRepository.Options): Promise<T>;
  abstract generateId(...args: any[]): string;
}

export namespace iBaseRepository {
  export interface Options extends iDatabase.Options {}
}
