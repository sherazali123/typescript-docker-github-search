"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http2_1 = require("http2");
exports.default = (function () { return function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.success = function (_a) {
                    var statusCode = _a.statusCode, _b = _a.data, data = _b === void 0 ? undefined : _b;
                    var status = 'success';
                    if (!!statusCode && statusCode < http2_1.constants.HTTP_STATUS_BAD_REQUEST)
                        ctx.status = statusCode;
                    else if (!(ctx.status < http2_1.constants.HTTP_STATUS_BAD_REQUEST))
                        ctx.status = http2_1.constants.HTTP_STATUS_OK;
                    ctx.body = { status: status, data: data };
                };
                ctx.error = function (_a) {
                    var statusCode = _a.statusCode, code = _a.code, _b = _a.message, message = _b === void 0 ? undefined : _b;
                    var status = 'error';
                    if (!!statusCode &&
                        statusCode >= http2_1.constants.HTTP_STATUS_BAD_REQUEST &&
                        statusCode < 600)
                        ctx.status = statusCode;
                    else if (!(ctx.status >= http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR &&
                        ctx.status < 600))
                        ctx.status = http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
                    ctx.body = { status: status, code: code, message: message };
                };
                ctx.ok = function (params) {
                    if (params === void 0) { params = {}; }
                    ctx.success(__assign(__assign({}, params), { statusCode: http2_1.constants.HTTP_STATUS_OK }));
                };
                ctx.created = function (params) {
                    if (params === void 0) { params = {}; }
                    ctx.success(__assign(__assign({}, params), { statusCode: http2_1.constants.HTTP_STATUS_CREATED }));
                };
                ctx.accepted = function (params) {
                    if (params === void 0) { params = {}; }
                    ctx.success(__assign(__assign({}, params), { statusCode: http2_1.constants.HTTP_STATUS_ACCEPTED }));
                };
                ctx.noContent = function () {
                    ctx.success({
                        statusCode: http2_1.constants.HTTP_STATUS_NO_CONTENT
                    });
                };
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }; });
