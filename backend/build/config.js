"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePort = void 0;
var dotenv = __importStar(require("dotenv"));
var path = __importStar(require("path"));
var lodash_1 = require("lodash");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });
process.env.NODE_ENV = process.env.NODE_ENV
    ? process.env.NODE_ENV.toLocaleLowerCase()
    : 'development';
var ROOT = path.resolve(__dirname, '../');
var config = {
    server: {
        port: normalizePort(lodash_1.defaultTo(process.env.PORT, 1000)),
        root: ROOT,
        host: lodash_1.defaultTo(process.env.NODE_HOST, 'localhost')
    },
    cors: {
        origin: '*',
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
        exposeHeaders: ['X-Request-Id']
    },
    bodyParser: {
        enableTypes: ['json', 'form'],
        formLimit: '10mb',
        jsonLimit: '10mb'
    },
    nodeEnv: process.env.NODE_ENV,
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    github: {
        baseUrl: lodash_1.defaultTo(process.env.GITHUB_API, 'https://api.github.com')
    },
    redis: {
        host: lodash_1.defaultTo(process.env.REDIS_HOST, '127.0.0.1'),
        port: normalizePort(lodash_1.defaultTo(process.env.REDIS_PORT, 6379)),
        url: lodash_1.defaultTo(process.env.REDIS_CONNECTION_URL, 'redis://localhost:6379')
    }
};
/**
 * Normalize port
 * @param val {string} value port
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return port;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
exports.normalizePort = normalizePort;
exports.default = config;
