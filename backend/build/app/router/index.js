"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var base_1 = __importDefault(require("./base"));
var search_1 = __importDefault(require("./search"));
var koa_router_1 = __importDefault(require("koa-router"));
var router = new koa_router_1.default();
exports.router = router;
router.use('/', base_1.default.routes(), base_1.default.allowedMethods());
router.use('/api', search_1.default.routes(), search_1.default.allowedMethods());
