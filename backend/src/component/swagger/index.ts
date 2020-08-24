/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';

import swaggerJSDoc from 'swagger-jsdoc';

const info: any = {
  title: 'Trading Coding Task',
  description: '',
  version: '1.0.0',
  contact: 'Sheraz Ali',
  termsOfService: ''
};
const servers: Array<string> = [];

// Swagger definitions
const definition: any = {
  openapi: '3.0.0',
  info,
  servers
};

// Options for the swagger specification
const options: any = {
  definition,
  // Path to the API specs
  apis: [
    path.join(__dirname, './tags.yaml'),
    path.join(__dirname, '../../app/controller/**/*.ts'),
    path.join(__dirname, '../../app/controller/**/*.js'),
    path.join(__dirname, './template/schemas.yaml'),
    path.join(__dirname, './template/headers.yaml'),
    path.join(__dirname, './template/parameters.yaml'),
    path.join(__dirname, './template/requestBody.yaml'),
    path.join(__dirname, './template/responses.yaml')
  ]
};

export default swaggerJSDoc(options);
