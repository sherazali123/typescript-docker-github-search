"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("../controller");
var koa_router_1 = __importDefault(require("koa-router"));
var router = new koa_router_1.default();
exports.default = router
    .post('/search', controller_1.search.index)
    .get('/clear-cache', controller_1.search.invalidate);
