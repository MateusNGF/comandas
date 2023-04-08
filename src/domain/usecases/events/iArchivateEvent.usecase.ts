import { iUsecase } from '../../contracts';

export abstract class iArchivateEvent implements iUsecase {
  abstract exec(
    input: iArchivateEvent.input,
    options?: iUsecase.Options
  ): Promise<iArchivateEvent.output>;
}

export namespace iArchivateEvent {
  export type input = {
    companyId: string;
    eventId: string;
    action: 'archive' | 'unarchive';
  };
  export type output = boolean;
}
