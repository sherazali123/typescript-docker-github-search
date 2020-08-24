import * as dotenv from 'dotenv';
import * as path from 'path';
import { defaultTo } from 'lodash';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

process.env.NODE_ENV = process.env.NODE_ENV
  ? process.env.NODE_ENV.toLocaleLowerCase()
  : 'development';

const ROOT = path.resolve(__dirname, '../');

export interface IConfig {
  server: {
    port: number | boolean;
    root: string;
    host: string;
  };
  cors: {
    origin: string;
    allowMethods: string[];
    exposeHeaders: string[];
  };
  bodyParser: {
    enableTypes: string[];
    formLimit: string;
    jsonLimit: string;
  };
  nodeEnv: string;
  isTest: boolean;
  isProduction: boolean;
  isDevelopment: boolean;
  github: {
    baseUrl: string;
  };
  redis: {
    host: string;
    port: number | boolean;
    url: string;
  };
}

const config: IConfig = {
  server: {
    port: normalizePort(defaultTo(process.env.PORT, 1000)),
    root: ROOT,
    host: defaultTo(process.env.NODE_HOST, 'localhost')
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
    baseUrl: defaultTo(process.env.GITHUB_API, 'https://api.github.com')
  },
  redis: {
    host: defaultTo(process.env.REDIS_HOST, '127.0.0.1'),
    port: normalizePort(defaultTo(process.env.REDIS_PORT, 6379)),
    url: defaultTo(process.env.REDIS_CONNECTION_URL, 'redis://localhost:6379')
  }
};

/**
 * Normalize port
 * @param val {string} value port
 */
export function normalizePort(val: string | number): number | boolean {
  const port: number = parseInt(val as string, 10);

  if (isNaN(port)) {
    return port;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

export default config;
