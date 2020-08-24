import { BaseError, NotFound } from './../../constant/errors';
import { DefaultContext } from 'koa';
import { constants } from 'http2';

export default () => async (
  ctx: DefaultContext,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: () => Promise<any>
): Promise<void> => {
  try {
    await next();

    if (
      !ctx.body &&
      (!ctx.status ||
        ctx.status === constants.HTTP_STATUS_NOT_FOUND ||
        ctx.status === constants.HTTP_STATUS_METHOD_NOT_ALLOWED)
    ) {
      throw new NotFound();
    }
  } catch (err) {
    if (err instanceof BaseError) {
      ctx.error({
        statusCode: err.statusCode,
        code: err.code,
        message: err.message
      });
    } else {
      ctx.error({
        status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        code: err.code,
        message: err.message
      });
    }
    ctx.app.emit('error', err, ctx);
  }
};
