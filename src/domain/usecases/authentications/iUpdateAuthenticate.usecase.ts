import { iUsecase } from '../../contracts';

export abstract class iUpdadeAuthenticate extends iUsecase {
  abstract exec(
    input: iUpdadeAuthenticate.input
  ): Promise<iUpdadeAuthenticate.output>;
}

export namespace iUpdadeAuthenticate {
  export type input = { authId: string; email?: string; password?: string };
  export type output = Boolean;
}
