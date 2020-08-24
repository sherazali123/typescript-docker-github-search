import { BaseError } from './baseError';
import { constants } from 'http2';

export class ConnectionError extends BaseError {
  constructor() {
    super();
    this.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    this.code = 'INTERNAL_ERROR';
    this.message =
      'The server encountered an internal error. Please check your internet connection.';
  }
}
