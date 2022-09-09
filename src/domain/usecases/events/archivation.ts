import { iUsecase } from '../../contracts';

export abstract class iArchivationEvent implements iUsecase {
  abstract exec(input: iArchivationEvent.input): Promise<iArchivationEvent.output>;
}

export namespace iArchivationEvent {
  export type input = {
    companyId: string;
    eventId: string;
  };
  export type output = {
    archived: boolean;
  };
}
