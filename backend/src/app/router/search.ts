import { search } from '../controller';
import Router from 'koa-router';

const router = new Router();

export default router
  .post('/search', search.index)
  .get('/clear-cache', search.invalidate);
