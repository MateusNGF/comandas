import { iUsecase } from '../../contracts';
import { EventEntity } from '../../entities/event.entity';

export abstract class iCreateEventUsecase implements iUsecase {
  abstract exec(
    input: iCreateEventUsecase.Input,
    options?: iUsecase.Options
  ): Promise<iCreateEventUsecase.Output>;
}

export namespace iCreateEventUsecase {
  export type Input = EventEntity
  export type Output = EventEntity
}
