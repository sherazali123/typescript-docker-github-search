import base from './base';
import search from './search';
import Router from 'koa-router';

const router = new Router();

router.use('/', base.routes(), base.allowedMethods());
router.use('/api', search.routes(), search.allowedMethods());

export { router };
