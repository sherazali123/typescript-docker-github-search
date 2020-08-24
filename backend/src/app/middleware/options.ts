/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DefaultContext } from 'koa';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default () => async (ctx: DefaultContext, next: () => Promise<any>) => {
  if (ctx.method === 'OPTIONS') {
    ctx.status = 200;
  } else {
    await next();
  }
};
