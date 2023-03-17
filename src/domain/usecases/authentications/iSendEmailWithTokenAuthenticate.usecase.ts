import { iTokenAdapter } from '../../../../src/infra/cryptography/contracts';
import { iUsecase } from '../../contracts';

export abstract class iSendEmailWithTokenAuthenticate implements iUsecase {
  abstract exec(
    input: iSendEmailWithTokenAuthenticate.input,
    options?: iSendEmailWithTokenAuthenticate.options
  ): Promise<iSendEmailWithTokenAuthenticate.output>;
}

export namespace iSendEmailWithTokenAuthenticate {
  export type input = { email: string };
  export type output = Boolean;
  export type payloadToken = {
    authId: string;
  };
  export type options = iTokenAdapter.options;
}
