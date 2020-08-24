"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import validator from 'node-input-validator';
// eslint-disable-next-line @typescript-eslint/no-var-requires
var swaggerUi = require('swagger-ui-koa');
// import overrideValidator from './middleware/validation';
var responseHandler_1 = __importDefault(require("./middleware/responseHandler"));
var errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
var options_1 = __importDefault(require("./middleware/options"));
var config_1 = __importDefault(require("../config"));
var router_1 = require("./router");
// console.log('router', router);
// import sentry from '../component/sentry';
// import { getLogLevelForStatus } from '../lib/logger';
var koa_compress_1 = __importDefault(require("koa-compress"));
var koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
var cors_1 = __importDefault(require("@koa/cors"));
var koa_1 = __importDefault(require("koa"));
var app = new koa_1.default();
// Validation middleware -> adds ctx.validate
// app.use(validator.koa());
// app.use(overrideValidator());
// Enable cors with default options
app.use(cors_1.default(config_1.default.cors));
// Enable bodyParser with default options
app.use(koa_bodyparser_1.default(config_1.default.bodyParser));
// handler
app.use(responseHandler_1.default());
app.use(errorHandler_1.default());
app.use(swaggerUi.serve);
app.use(koa_compress_1.default());
app.use(options_1.default());
// routers
app.use(router_1.router.routes()).use(router_1.router.allowedMethods());
exports.default = app;
