// import validator from 'node-input-validator';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerUi = require('swagger-ui-koa');

// import overrideValidator from './middleware/validation';
import responseHandler from './middleware/responseHandler';
import errorHandler from './middleware/errorHandler';
import options from './middleware/options';

import config from '../config';
import { router } from './router';
// console.log('router', router);
// import sentry from '../component/sentry';
// import { getLogLevelForStatus } from '../lib/logger';

import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import Koa from 'koa';

const app: Koa = new Koa();

// Validation middleware -> adds ctx.validate
// app.use(validator.koa());
// app.use(overrideValidator());

// Enable cors with default options
app.use(cors(config.cors));

// Enable bodyParser with default options
app.use(bodyParser(config.bodyParser));

// handler
app.use(responseHandler());
app.use(errorHandler());

app.use(swaggerUi.serve);

app.use(compress());
app.use(options());

// routers
app.use(router.routes()).use(router.allowedMethods());

export default app;
