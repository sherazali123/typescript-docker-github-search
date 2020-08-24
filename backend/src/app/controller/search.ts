import { DefaultContext } from 'koa';
import axios from 'axios';
import toCamelCase from 'camelcase-keys';
import {
  SearchInput,
  SearchResult,
  InvalidateResult
} from './../interfaces/search';
import { SearchTypes } from './../interfaces/enums';
import { InternalError } from './../../constant/errors/global/internalError';
import { ConnectionError } from './../../constant/errors/global/connectionError';
import { UnprocessableEntity } from './../../constant/errors/global/unprocessableEntity';
import { constants } from 'http2';

import config from './../../config';
import { Redis } from './../../component/redis';

const redis = new Redis();

export default class SearchController {
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
  public static async index(ctx: DefaultContext): Promise<void> {
    let body: SearchInput = ctx.request.body;

    const { text = '', type = SearchTypes.repositories } = body;

    body = { text, type };
    SearchController.validateSearch({ text, type });
    ctx.body = await SearchController.search({ text, type });
  }

  public static validateSearch(body: SearchInput): void {
    const { text, type } = body;
    const searchTypes = [
      SearchTypes.repositories,
      SearchTypes.users,
      SearchTypes.issues
    ];

    if (!text) {
      throw new UnprocessableEntity('text is required.');
    }
    if (!type) {
      throw new UnprocessableEntity('type is required.');
    }

    if (searchTypes.indexOf(type) === -1) {
      throw new UnprocessableEntity(
        `Invalid search type. Select from ${searchTypes.join(', ')}`
      );
    }
  }

  public static async search(body: SearchInput): Promise<SearchResult> {
    let source = 'redis';
    const { github } = config;
    const { text, type } = body;
    const key = text + type;

    const redisResponse: string = await redis.get(key);
    if (redisResponse) {
      return { source, payload: JSON.parse(redisResponse) };
    }

    source = 'github';
    const url = `${github.baseUrl}/search/${type}?q=${text}`;
    const { status: statusCode, data: githubResponse } = await axios.get(url);
    if (statusCode !== constants.HTTP_STATUS_OK) {
      throw new ConnectionError();
    }

    const payload = toCamelCase(githubResponse, { deep: true });
    await redis.set(key, JSON.stringify(payload));

    return { source, payload };
  }

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
  public static async invalidate(ctx: DefaultContext): Promise<void> {
    try {
      const response: InvalidateResult = { clear: false };

      await redis.invalidate();
      response.clear = true;
      ctx.body = response;
    } catch (error) {
      throw new InternalError();
    }
  }
}
