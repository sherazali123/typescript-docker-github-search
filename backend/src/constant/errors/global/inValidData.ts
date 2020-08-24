import { BaseError } from './baseError';
import { constants } from 'http2';

export class InvalidData extends BaseError {
  constructor(error: string) {
    super();
    this.statusCode = constants.HTTP_STATUS_UNPROCESSABLE_ENTITY;
    this.code = 'UNPROCESSABLE_ENTITY';
    this.message = error;
  }
}
