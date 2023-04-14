import {
  iSendEmailWithTokenAuthenticate,
  iUpdadeAuthenticate,
} from '../../../../src/domain/usecases/authentications';
import { BadRequestError } from '../../../../src/domain/errors';
import { HTTP_STATUS } from '../../../utils/types/Http.status';
import { ObjectManager } from '../../../utils';
import { iTokenAdapter } from '../../../../src/infra/cryptography/contracts';
import { iController } from '../../contracts';
import { HttpRequest, HttpResponse } from '../../helpers/http';

export class ResetPasswordCompanyController extends iController {
  constructor(
    private readonly tokenAdapter: iTokenAdapter,
    private readonly updateAuthenticateUsecase: iUpdadeAuthenticate,
    private readonly sendEmailWithTokenAuthenticateUsecase: iSendEmailWithTokenAuthenticate
  ) {
    super();
  }
  async exec(request: HttpRequest): Promise<HttpResponse> {
    switch (request.params.step) {
      case 'one':
        return this.stepOne(request);
      case 'two':
        return this.stepTwo(request);
      default:
        throw new BadRequestError('Operation not found.');
    }
  }

  // send email
  private async stepOne(request: HttpRequest): Promise<HttpResponse> {
    try {
      ObjectManager.hasKeys<iSendEmailWithTokenAuthenticate.input>(
        ['email'],
        request.body
      );

      const { email } = request.body;
      if (
        await this.sendEmailWithTokenAuthenticateUsecase.exec(
          { email },
          { secretKey: process.env.SECRET_RESET_PASSWORD }
        )
      ) {
        return this.sendSucess(HTTP_STATUS.OK, `Email sended to ${email}.`);
      } else throw new BadRequestError(`Send email to ${email} failed.`);
    } catch (error) {
      return this.sendError(error);
    }
  }

  // change password
  private async stepTwo(request: HttpRequest) {
    try {
      ObjectManager.hasKeys(
        ['tokenToChangeCredentials', 'password'],
        request.body
      );

      const { tokenToChangeCredentials, password } = request.body;
      const { authId } =
        await this.tokenAdapter.verify<iSendEmailWithTokenAuthenticate.payloadToken>(
          tokenToChangeCredentials,
          process.env.SECRET_RESET_PASSWORD
        );

      if (await this.updateAuthenticateUsecase.exec({ authId, password })) {
        return this.sendSucess(HTTP_STATUS.OK, `Password has updateded.`);
      } else throw new BadRequestError('Change password failed, try again.');
    } catch (error) {
      return this.sendError(error);
    }
  }
}
