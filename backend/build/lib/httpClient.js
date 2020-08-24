"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
var axios_1 = __importDefault(require("axios"));
var HttpClient = /** @class */ (function () {
    function HttpClient(baseURL) {
        this.instance = axios_1.default.create({
            baseURL: baseURL
        });
    }
    return HttpClient;
}());
exports.default = HttpClient;
