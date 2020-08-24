import redis, { RedisClient } from 'redis';
import { promisify } from 'util';
import crypto from 'crypto';
import { ConnectionError } from './../constant/errors/global/connectionError';
import { ConnectionOptions } from './../app/interfaces/redis';
import config from './../config';
console.log('config', config);
const connectionOpts: ConnectionOptions = {
  host: config.redis.host,
  port: config.redis.port,
  url: config.redis.url
};

interface IRedis {
  connect(): RedisClient;
  set(key: string, value: string): void;
  get(key: string): Promise<string>;
  invalidate(): Promise<void>;
}

export class Redis implements IRedis {
  private connection: RedisClient | undefined;

  public connect(): RedisClient {
    if (this.connection) {
      return this.connection;
    }

    this.connection = redis.createClient({ url: connectionOpts.url });
    return this.connection;
  }

  public async generateKey(key: string): Promise<string> {
    return await crypto
      .createHash('md5')
      .update(key.toLowerCase().trim())
      .digest('hex');
  }

  public async set(key: string, value: string): Promise<void> {
    try {
      if (!this.connection) {
        this.connect();
      }
      if (this.connection) {
        // here key will expire after 2 hours
        await this.connection.setex(
          await this.generateKey(key),
          2 * 60 * 60,
          value
        );
      }
    } catch (error) {
      throw new ConnectionError();
    }
  }

  public async get(key: string): Promise<string> {
    try {
      if (!this.connection) {
        this.connect();
      }
      if (this.connection) {
        const getAsync = promisify(this.connection.get).bind(this.connection);
        const data = await getAsync(await this.generateKey(key));
        return data ? data : '';
      }
      return '';
    } catch (error) {
      throw new ConnectionError();
    }
  }

  public async invalidate(): Promise<void> {
    try {
      if (!this.connection) {
        this.connect();
      }
      if (this.connection) {
        await this.connection.flushall('ASYNC');
      }
    } catch (error) {
      throw new ConnectionError();
    }
  }
}
