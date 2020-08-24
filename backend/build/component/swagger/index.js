"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var path_1 = __importDefault(require("path"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var info = {
    title: 'Trading Coding Task',
    description: '',
    version: '1.0.0',
    contact: 'Sheraz Ali',
    termsOfService: ''
};
var servers = [];
// Swagger definitions
var definition = {
    openapi: '3.0.0',
    info: info,
    servers: servers
};
// Options for the swagger specification
var options = {
    definition: definition,
    // Path to the API specs
    apis: [
        path_1.default.join(__dirname, './tags.yaml'),
        path_1.default.join(__dirname, '../../app/controller/**/*.ts'),
        path_1.default.join(__dirname, '../../app/controller/**/*.js'),
        path_1.default.join(__dirname, './template/schemas.yaml'),
        path_1.default.join(__dirname, './template/headers.yaml'),
        path_1.default.join(__dirname, './template/parameters.yaml'),
        path_1.default.join(__dirname, './template/requestBody.yaml'),
        path_1.default.join(__dirname, './template/responses.yaml')
    ]
};
exports.default = swagger_jsdoc_1.default(options);
