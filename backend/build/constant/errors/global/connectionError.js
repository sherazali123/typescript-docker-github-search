"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionError = void 0;
var baseError_1 = require("./baseError");
var http2_1 = require("http2");
var ConnectionError = /** @class */ (function (_super) {
    __extends(ConnectionError, _super);
    function ConnectionError() {
        var _this = _super.call(this) || this;
        _this.statusCode = http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
        _this.code = 'INTERNAL_ERROR';
        _this.message =
            'The server encountered an internal error. Please check your internet connection.';
        return _this;
    }
    return ConnectionError;
}(baseError_1.BaseError));
exports.ConnectionError = ConnectionError;
