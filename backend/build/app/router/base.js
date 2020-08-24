"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("../controller");
var koa_router_1 = __importDefault(require("koa-router"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
var swaggerUi = require('swagger-ui-koa');
var swagger_1 = __importDefault(require("../../component/swagger"));
var router = new koa_router_1.default();
exports.default = router
    .get('/', controller_1.general.index)
    .get('swagger', swaggerUi.setup(swagger_1.default));
