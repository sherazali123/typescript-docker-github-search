"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var camelcase_keys_1 = __importDefault(require("camelcase-keys"));
var enums_1 = require("./../interfaces/enums");
var internalError_1 = require("./../../constant/errors/global/internalError");
var connectionError_1 = require("./../../constant/errors/global/connectionError");
var unprocessableEntity_1 = require("./../../constant/errors/global/unprocessableEntity");
var http2_1 = require("http2");
var config_1 = __importDefault(require("./../../config"));
var redis_1 = require("./../../component/redis");
var redis = new redis_1.Redis();
var SearchController = /** @class */ (function () {
    function SearchController() {
    }
    /**
     * @swagger
     *
     * /api/search:
     *   post:
     *     description: Search repositories, users and issues.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Body
     *         description: Post text and search type in body
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *            type: object
     *            properties:
     *              q:
     *                type: string
     *                default: ''
     *              type:
     *                type: string
     *                default: repositories
     *     responses:
     *       200:
     *         description: Search results for search type ['repositories', 'users', 'issues']
     */
    SearchController.index = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var body, _a, text, _b, type, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        body = ctx.request.body;
                        _a = body.text, text = _a === void 0 ? '' : _a, _b = body.type, type = _b === void 0 ? enums_1.SearchTypes.repositories : _b;
                        body = { text: text, type: type };
                        SearchController.validateSearch({ text: text, type: type });
                        _c = ctx;
                        return [4 /*yield*/, SearchController.search({ text: text, type: type })];
                    case 1:
                        _c.body = _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchController.validateSearch = function (body) {
        var text = body.text, type = body.type;
        var searchTypes = [
            enums_1.SearchTypes.repositories,
            enums_1.SearchTypes.users,
            enums_1.SearchTypes.issues
        ];
        if (!text) {
            throw new unprocessableEntity_1.UnprocessableEntity('text is required.');
        }
        if (!type) {
            throw new unprocessableEntity_1.UnprocessableEntity('type is required.');
        }
        if (searchTypes.indexOf(type) === -1) {
            throw new unprocessableEntity_1.UnprocessableEntity("Invalid search type. Select from " + searchTypes.join(', '));
        }
    };
    SearchController.search = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var source, github, text, type, key, redisResponse, url, _a, statusCode, githubResponse, payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        source = 'redis';
                        github = config_1.default.github;
                        text = body.text, type = body.type;
                        key = text + type;
                        return [4 /*yield*/, redis.get(key)];
                    case 1:
                        redisResponse = _b.sent();
                        if (redisResponse) {
                            return [2 /*return*/, { source: source, payload: JSON.parse(redisResponse) }];
                        }
                        source = 'github';
                        url = github.baseUrl + "/search/" + type + "?q=" + text;
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2:
                        _a = _b.sent(), statusCode = _a.status, githubResponse = _a.data;
                        if (statusCode !== http2_1.constants.HTTP_STATUS_OK) {
                            throw new connectionError_1.ConnectionError();
                        }
                        payload = camelcase_keys_1.default(githubResponse, { deep: true });
                        return [4 /*yield*/, redis.set(key, JSON.stringify(payload))];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, { source: source, payload: payload }];
                }
            });
        });
    };
    /**
     * @swagger
     * /api/clear-cache:
     *  get:
     *      tags:
     *          - Invalidate
     *      summary: Clear cache from redis.
     *      responses:
     *          200:
     *              description: Should throw clear 'true' if cache is cleared.
     *              content:
     *                  application/json:
     */
    SearchController.invalidate = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        response = { clear: false };
                        return [4 /*yield*/, redis.invalidate()];
                    case 1:
                        _a.sent();
                        response.clear = true;
                        ctx.body = response;
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        throw new internalError_1.InternalError();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SearchController;
}());
exports.default = SearchController;
