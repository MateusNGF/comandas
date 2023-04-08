import { iUsecase } from '../../contracts';

export abstract class iUpdadeAuthenticate implements iUsecase {
  abstract exec(
    input: iUpdadeAuthenticate.input,
    options?: iUsecase.Options
  ): Promise<iUpdadeAuthenticate.output>;
}

export namespace iUpdadeAuthenticate {
  export type input = { authId: string; email?: string; password?: string };
  export type output = Boolean;
}
