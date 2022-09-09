import { BadRequestError } from './http.error';

export class MissingParamError extends BadRequestError {
  name: string = 'Missing Param';

  constructor(param) {
    super(`The param '${param}' is required.`);
  }
}

export class UnexpectedParamError extends BadRequestError {
  name: string = 'Unexpected Param';

  constructor(param) {
    super(`The param '${param}' not is required.`);
  }
}
